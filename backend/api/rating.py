import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()
user_ref = db.collection("university")

universites = user_ref.stream()

for uni in universites:
    res_ref = uni.collection('residences')
    residences = res_ref.stream()

    for res in residences:
        rating_ref = res.collection('rating')
        