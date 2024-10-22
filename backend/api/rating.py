import json

from firebase_admin import credentials, firestore
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

db = firestore.client()
user_ref = db.collection("universities")

def create_review(uni_name, res_name, user, message, rating_value):
    rating_ref = get_rating_ref(uni_name, res_name)
    rating = rating_ref.document(user.lower())
    rating.set({
        "user":user,
        "message": message,
        "rating": rating_value
    })
    return {'success': 'rating_created'}

def update_review(uni_name, res_name, user, data):
    rating_ref = get_rating_ref(uni_name, res_name)
    rating = rating_ref.document(user.lower())
    current_data = rating.get().to_dict()
    
    if not current_data:
        return {'error': 'rating does not exist'}
    update_data = {**current_data, **data}
    rating.update(update_data)
    return {'success': 'rating updated'}

def delete_review(uni_name, res_name, user):
    rating_ref = get_rating_ref(uni_name, res_name)
    data = rating_ref.document(user.lower()).get().to_dict()

    if not data:
        return {'error': 'rating does not exist'}
    
    rating_ref.document(user.lower()).delete()
    return {'success': 'rating has been deleted'}

def average_rating(request, university, residence_name):
    total_rating = 0
    num_rating = 0
    house_ref = user_ref.document(university.lower()).collection('residence').document(residence_name.lower())
    ratings = get_rating_ref(university, residence_name).stream()

    for r in ratings:
        data = r.to_dict()
        rating = data.get('rating')
        if rating is not None: 
            total_rating += rating
            num_rating += 1
    
    if total_rating > 0:
        average = total_rating / num_rating
        rounded_average = round(average)
        house_ref.update({
            'average_rating': f'{rounded_average} / 5.0'
        })
        return JsonResponse({'average': rounded_average})

    
    else:
        house_ref.update({
            'average_rating': f'{total_rating} / 5.0'
        })
        return JsonResponse({'average': total_rating})


def get_rating_ref(uni_name, res_name):
    uni_ref = user_ref.document(uni_name.lower())
    house_ref = uni_ref.collection('residence').document(res_name.lower())
    return house_ref.collection('rating')

def get_university(request):
    unis = user_ref.stream()

    unis_data = []
    for uni in unis:
        u_data = uni.to_dict()
        unis_data.append(u_data)
    
    print(unis_data)
    return JsonResponse({"universities": unis_data})

def get_residences(request, university):
    uni_ref = user_ref.document(university.lower())
    residences = uni_ref.collection('residence').stream()

    residence_data = []
    for res in residences:
        res_data = res.to_dict()
        residence_data.append(res_data)

    return JsonResponse({'residences': residence_data})

def get_residence_info(request, university, residence_name):
    res_ref = user_ref.document(university.lower()).collection('residence').document(residence_name.lower())
    res_data = res_ref.get().to_dict()
    return JsonResponse({'residenceInfo': res_data})    

def fetch_ratings(request, university, residence_name):
    res_ref = user_ref.document(university.lower()).collection('residence').document(residence_name.lower()).collection('rating')
    rating_data = res_ref.stream()

    data = []
    print(rating_data)
    for rating_doc in rating_data:
        rating = rating_doc.to_dict()
        print(rating)
        r = {
            'user': rating.get('user'),
            'message': rating.get('message'),
            'rating': rating.get('rating')
        }
        print(r)
        data.append(r)

    return JsonResponse({'ratings': data})
