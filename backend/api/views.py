from django.shortcuts import render
from django.db import models
from django.http import HttpResponse, JsonResponse
import json

#firebase
from .firebase_utils import fetch_user

def hello_world(request):
    return HttpResponse("Hello, World!")

def user_login(request):
    data = json.loads(request.body)
    name = data.get('name')
    password = data.get('password')
    email = data.get('email')
    return JsonResponse({
        "name": name,
        "password": password,
        "email": email
    })


def test():
    fetch_user()