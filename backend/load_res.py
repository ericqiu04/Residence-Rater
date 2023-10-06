import firebase_admin
from firebase_admin import credentials, firestore, db
import json

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()

with open("../json/university_residences.json", "r") as json_file:
    data = json.load(json_file)
    for uni in data["universities"]:
        print('1')
        school_id = uni["school_id"]
        print('2')
        res_data = uni["housing"]
        print('3')
        school_ref = db.collection("university").document(school_id.lower())
        print('4')
        print(uni['logo'])
        print(school_id)
        school_ref.set({"name": school_id, "logo": uni["logo"]})
        print('set')
        house_ref = school_ref.collection("residence")
        print(house_ref)

        for res in res_data:
            total_rating = 0
            num_rating = 0
            res_id = res["res_name"]
            res_ref = house_ref.document(res_id.lower())
            rating_ref = res_ref.collection('rating')
            ratings = rating_ref.stream()

            for r in ratings:
                data = r.to_dict()
                rating = data.get('rating')
                if(rating):
                    total_rating += rating
                    num_rating += 1


            if (num_rating):
                average_rating = round(total_rating / num_rating, 1)
            else:
                average_rating = 0
            res_ref.set(
                {
                    "resName": res["res_name"],
                    "price": res["price"],
                    "style": res["style"],
                    "link": res["rLink"],
                    "imageLink": res['resCoverImage'],
                    "rating": str(average_rating) + ' / 5.0'
                }
            )
            rating_ref = res_ref.collection("rating")
            rating = rating_ref.document("test")
            rating.set({})
