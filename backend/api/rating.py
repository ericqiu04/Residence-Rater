import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()
user_ref = db.collection("university")

def create_review(uni_name, res_name,user, message, rating):

    uni_ref = user_ref.document(uni_name.lower())
    house_ref = uni_ref.collection('residence').document(res_name.lower())
    rating_ref = house_ref.collection('rating')
    rating = rating_ref.document(user.lower)
    rating.set({
        "message": message,
        "rating": rating
    })
    
    return {'success', 'rating_created'}