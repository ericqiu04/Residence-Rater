import corsheaders
from django.shortcuts import render
from django.db import models
from django.http import HttpResponse, JsonResponse
import json

from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt



from .rating import create_review, update_review, delete_review

def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})
    
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