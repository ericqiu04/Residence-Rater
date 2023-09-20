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
        school_id = uni['school_id']
        res_data = uni['housing']
        print(school_id)
        school_ref = db.collection('universities').document(school_id.lower())

        house_ref = school_ref.collection('residence')

        for res in res_data:
            res_id = res['res_name']
            print(res_id)
            res_ref = house_ref.document(res_id)
            res_ref.set({
                'location': res['location'],
                'price': res['price'],
                'style': res['style'],
                'link': res['rLink']
            })
            rating_ref = res_ref.collection('rating')
            rating = rating_ref.document('test')
            rating.set({
                'user': 'test',
                'comment': 'it is good',
                'rating': 4.5
            })
            

