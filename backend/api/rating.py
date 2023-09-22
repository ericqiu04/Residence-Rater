from firebase_admin import credentials, firestore

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

def delete_rating(uni_name, res_name, user):
    rating_ref = get_rating_ref(uni_name, res_name)
    data = rating_ref.document(user.lower()).get().to_dict()

    if not data.exists:
        return {'error': 'rating does not exist'}
    
    rating_ref.document(user.lower()).delete()

    return {'success': 'rating has been deleted'}


def get_rating_ref(uni_name, res_name):
    uni_ref = user_ref.document(uni_name.lower())
    house_ref = uni_ref.collection('residence').document(res_name.lower())
    return house_ref.collection('rating')