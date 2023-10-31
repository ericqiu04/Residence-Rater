import firebase_admin
from firebase_admin import credentials, firestore, auth
import bcrypt

from rest_framework.response import Response
import json
from django.http import JsonResponse

def get_firebase_key(request):
     with open('../credentials/apiKey.json', 'r') as file:
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
        
        return JsonResponse({"message": "Token verified", "uid": uid, "email": email, "name": display_name}, status = 200)

    except Exception as e:
        return JsonResponse({'error': 'failed to verify'})