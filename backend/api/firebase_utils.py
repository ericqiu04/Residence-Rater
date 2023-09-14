from django.shortcuts import render
from django.http import request
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('../credentials/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def fetch_user():
    users_ref = db.collection(u'users')
    docs = users_ref.stream()

    user_data = []

    for doc in docs:
        user_data.append(doc.to_dict())

    return render(request, 'fetch_data.html', {'user_data': user_data})
        
    