import firebase_admin
from firebase_admin import credentials, firestore, auth
import bcrypt

from rest_framework.response import Response
import json
from django.http import JsonResponse

from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework import serializers, viewsets
from django.contrib.auth.models import User




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
        return JsonResponse({'config': key})


def verify_token(request):
    token = request.POST.get("idToken")   

    try:
        decoded_token = auth.verify_id_token(token) 
        uid = decoded_token['uid']
        email = decoded_token['email']
        password = decoded_token['password']
        display_name = decoded_token['displayName']
        
        return JsonResponse({"message": "Token verified", "uid": uid, "email": email, "name": display_name})

    except Exception as e:
        return JsonResponse({'error': 'failed to verify'})
    