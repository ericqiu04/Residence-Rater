from firebase_admin import credentials, firestore
from django.http import JsonResponse
cred = credentials.Certificate("../credentials/serviceAccountKey.json")
db = firestore.client()
user_ref = db.collection("universities")

def create_review(uni_name, res_name, user, message, rating_value):
    rating_ref = get_rating_ref(uni_name, res_name)
    rating = rating_ref.document(user.lower())
    rating.set({
        "message": message,
        "rating": rating_value
    })
    average_rating(uni_name, res_name)
    return {'success': 'rating_created'}

def update_review(uni_name, res_name, user, data):
    rating_ref = get_rating_ref(uni_name, res_name)
    rating = rating_ref.document(user.lower())
    current_data = rating.get().to_dict()
    
    if not current_data:
        return {'error': 'rating does not exist'}
    update_data = {**current_data, **data}
    rating.update(update_data)
    average_rating(uni_name, res_name)
    return {'success': 'rating updated'}

def delete_review(uni_name, res_name, user):
    rating_ref = get_rating_ref(uni_name, res_name)
    data = rating_ref.document(user.lower()).get().to_dict()

    if not data:
        return {'error': 'rating does not exist'}
    
    rating_ref.document(user.lower()).delete()
    average_rating(uni_name, res_name)
    return {'success': 'rating has been deleted'}

def average_rating(uni_name, res_name):
    total_rating = 0
    num_rating = 0
    rating_ref = get_rating_ref(uni_name, res_name)
    house_ref = user_ref.document(uni_name.lower()).collection('residence').document(res_name.lower())
    ratings = rating_ref.stream()

    for r in ratings:
        data = r.to_dict()
        rating = data.get('rating')
        total_rating += rating
        num_rating += 1
    
    if total_rating > 0:
        average = total_rating / num_rating
        house_ref.set({
            'average rating': average
        })

def get_rating_ref(uni_name, res_name):
    uni_ref = user_ref.document(uni_name.lower())
    house_ref = uni_ref.collection('residence').document(res_name.lower())
    return house_ref.collection('rating')

def get_university(request):
    unis = db.collection("universities").stream()

    unis_data = []
    for uni in unis:
        u_data = uni.to_dict()
        res_ref = uni.reference.collection("residence")

        res_data = []
        for res in res_ref.stream():
            r_data = res.to_dict()
            res_data.append(r_data)
        
        u_data["residence"] = res_data

        unis_data.append(u_data)
    
    return JsonResponse({"universities": unis_data})