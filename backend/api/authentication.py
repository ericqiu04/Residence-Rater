import firebase_admin
from firebase_admin import credentials, firestore, auth
import bcrypt

from rest_framework.response import Response
import json
from django.http import JsonResponse




cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()
user_ref = db.collection("users")

def get_firebase_config(request):
     with open('../credentials/serviceAccountKey.json', 'r') as file:
        data = json.load(file)
        key = data.get('firebase_key')
        firebase_config = {
            'apiKey': key,
            'authDomain': 'ontario-residence-rater.firebaseapp.com',
            'projectId': 'ontario-residence-rater',
            'storageBucket': 'ontario-residence-rater.appspot.com',
            'messagingSenderId': '1067956136255',
            'appId': '1:1067956136255:web:6fc048b52889a6cde18b8a',
          }
        return JsonResponse({'config': firebase_config})


def register(data):
    try:
        user = auth.create_user(
            email=data.get('email'),
            email_verified=True,
            password=data.get('password')
        )

        auth.set_custom_user_claims(user.uid, {
            'firstName': data.get('firstName'),
            'lastName': data.get('lastName')
        })

        custom_token = auth.create_custom_token(user.uid)

        return {'token': str(custom_token)}
    except Exception as e:
        return {'error': str(e)}



def login(data):
    try:
        user = auth.get_user_by_email(data.get('email'))
        if user:
            custom_token = auth.create_custom_token(user.uid)
            return {'token': str(custom_token)}
        else:
            return {'error': 'user not found'}


    except Exception as e:
        return {'error': str(e)}

def get_token(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')

        user = auth.get_user_by_email(email)
        if user:
            token = auth.create_custom_token(user.uid)
            return {'token': str(token)}
    except Exception as e:
        return {'error': 'user not found'}

def update_user(user, new_data):
    user_data = user_ref.document(user.upper())
    current_data = user_data.get().to_dict()
    if not current_data:
        return False
    updated_data = {**current_data, **new_data}
    user_data.update(updated_data)

    return True

def delete_data(user):
    user_data = user_ref.document(user.upper()).get()

    if not user_data.exists:
        return False
    
    user_ref.document(user.upper()).delete()
    return {'Message': 'User has been deleted', 'username': user}

def check_email(email):
    query = user_ref.where('email', '==', email).get()
    print(query)
    return len(query) > 0

def check_username(user):
    user_data = user_ref.document(user.upper()).get()
    if user_data.exists:
        return True
    else:
        return False

def get_user(user):
    print(user)
    user_data = user_ref.document(user.upper()).get()
    if user_data.exists:
        return user_data.to_dict()
    else:
        return None

