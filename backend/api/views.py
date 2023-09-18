from django.shortcuts import render
from django.db import models
from django.http import HttpResponse, JsonResponse
import json


# firebase
from .authentication import register, login

def hello_world(request):
    return HttpResponse("working")


def user_register(request):
    data = json.loads(request.body)
    username = data.get('username')
    fName = data.get("firstName")
    lName = data.get('lastName')
    password = data.get("password")
    cPassword = data.get('confirmPass')
    email = data.get("email")
    
    message = register(username,fName, lName, email, password, cPassword)
    return JsonResponse(message)
    
def user_login(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get("password")
    
    message = login(username, password)
    return JsonResponse(message)
