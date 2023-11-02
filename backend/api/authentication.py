from firebase_admin import credentials, firestore, auth
from django.views.decorators.csrf import csrf_protect
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def get_firebase_key(request):
     with open('../credentials/apiKey.json', 'r') as file:
        data = json.load(file)
        key = data.get('firebase_key')
        return JsonResponse({'config': key})

@csrf_exempt
def verify_token(request):
    token = json.loads(request.body).get('token')
    print(token)
    try:
        decoded_token = auth.verify_id_token(token) 
        uid = decoded_token['user_id']
        email = decoded_token['email']
        return JsonResponse({"message": "Token verified", "uid": uid, "email": email}, status = 200)

    except Exception as e:
        return JsonResponse({'error': 'failed to verify'})