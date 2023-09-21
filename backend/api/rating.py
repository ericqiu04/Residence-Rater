from firebase_admin import credentials, firestore

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
db = firestore.client()
user_ref = db.collection("universities")

def create_review(uni_name, res_name, user, message, rating_value):
    uni_ref = user_ref.document(uni_name.lower())
    house_ref = uni_ref.collection('residence').document(res_name.lower())
    print(res_name)
    rating_ref = house_ref.collection('rating')
    print(user)
    rating = rating_ref.document(user.lower())
    rating.set({
        "message": message,
        "rating": rating_value
    })
    
    return {'success': 'rating_created'}