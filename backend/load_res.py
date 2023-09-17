import firebase_admin
from firebase_admin import credentials, firestore, db
import json

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()

def load_json():
    with open('../json/university_residences.json', 'r') as file:
        data = json.load(file)
        for uni in data["universities"]:
            name = uni['name']
            print(name)
            ref = db.collection('universities')
            ref.document(name).set({'name': name})
    