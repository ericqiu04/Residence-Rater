from django.shortcuts import render
from django.db import models
from django.http import HttpResponse, JsonResponse
import json

from django.views.decorators.csrf import csrf_exempt


# firebase
from .authentication import register, login, get_user, update_user

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

@csrf_exempt
def user_profiles(request, username):
    if request.method == "GET":
        user_data = get_user(username)
        if user_data:
            return JsonResponse(user_data, status = 200)
        else:
            return JsonResponse({'error': 'user not found'}, status = 404)
    elif request.method == "PUT":
        data = json.loads(request.body)
        user_data = update_user(username, data)
        if user_data:
            return JsonResponse({'success': 'updated user information'}, status = 200)
        else:
            return JsonResponse({'error': 'user not found'}, status = 404)
    else:
        return JsonResponse({'error': 'invalid request method'}, status = 405)