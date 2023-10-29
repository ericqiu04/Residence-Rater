import corsheaders
from django.shortcuts import render
from django.db import models
from django.http import HttpResponse, JsonResponse
import json

from django.views.decorators.csrf import csrf_exempt


# firebase
from .authentication import register, login, get_user, update_user, delete_data
from .rating import create_review, update_review, delete_review

def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})

def user_register(request):
    data = json.loads(request.body)
    username = data.get('username')
    fName = data.get("firstName")
    lName = data.get('lastName')
    password = data.get("password")
    cPassword = data.get('confirmPass')
    email = data.get("email")
    
    message = register(username,fName, lName, email, password, cPassword)
    return Response(message)

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
    elif request.method == "DELETE":
        deleted_data = delete_data(username)
        if deleted_data:
            return JsonResponse(deleted_data, status = 200)
        else:
            return JsonResponse({'error': 'user not found'}, status = 404)
    else:
        return JsonResponse({'error': 'invalid request method'}, status = 405)
    
def create_rating(request, university, residence_name):
    data = json.loads(request.body)
    message = data.get('message')
    rating = data.get('rating')
    user = data.get('user')
    
    rating = create_review(uni_name = university,res_name = residence_name,user = user,message = message,rating_value = rating)
    if rating:
        return JsonResponse(rating)
    else:
        return JsonResponse({'error': 'there was a problem when creating rating'})

def update_rating(request, university, residence_name):
    data = json.loads(request.body)
    user = data.pop('user', None)
    rating = update_review(data = data, uni_name=university, res_name=residence_name, user = user)
    if rating:
        return JsonResponse(rating)
    else:
        return JsonResponse({'error': 'there was a problem when updating rating'})

def delete_rating(request, university, residence_name):
    user = json.loads(request.body).get('user')
    rating = delete_review(user = user, uni_name = university, res_name = residence_name)
    if rating:
        return JsonResponse(rating)
    else:
        return JsonResponse({'error': 'there was a problem when deleting rating'})