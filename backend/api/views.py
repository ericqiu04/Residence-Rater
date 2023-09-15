from django.shortcuts import render
from django.db import models
from django.http import HttpResponse, JsonResponse
import json


# firebase
from .firebase_utils import fetch_user, save_user


def hello_world(request):
    return HttpResponse("Hello, World!")


def user_login(request):
    data = json.loads(request.body)
    name = data.get("name")
    password = data.get("password")
    email = data.get("email")

    user_id = save_user(name, email, password)
    if user_id:
        return JsonResponse({"id": user_id})

    else:
        return JsonResponse({"id": "unknown"})


def test():
    fetch_user()
