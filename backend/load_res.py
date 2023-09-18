import firebase_admin
from firebase_admin import credentials, firestore, db
import json

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()
    
with open('../json/university_residences.json', 'r') as json_file:
    data = json.load(json_file)
    for uni in data["universities"]:
        name = uni['school_id']
        housing_data = uni['housing']
        print(name)
        ref = db.collection('universities').document(name)
        ref.set({
                'school_id': name
        })