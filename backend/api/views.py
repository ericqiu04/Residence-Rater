from django.shortcuts import render
from django.db import models
from django.http import HttpResponse

#firebase
from .firebase_utils import fetch_user

def hello_world(request):
    return HttpResponse("Hello, World!")

def test():
    fetch_user()