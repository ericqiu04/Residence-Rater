from django.shortcuts import render
from django.http import request
import firebase_admin
from firebase_admin import credentials, firestore, db

cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)

data = firestore.client()


def save_user(name, email, password):
    ref = data.collection("users")

    user_id = data.collection("users").document().id

    ref.document(user_id).set({"name": name, "email": email, "password": password})

    return user_id


def fetch_user():
    users_ref = data.collection("users")
    docs = users_ref.stream()

    user_data = []

    for doc in docs:
        user_data.append(doc.to_dict())

    return render(request, "fetch_data.html", {"user_data": user_data})
