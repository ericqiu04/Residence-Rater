from django.urls import path
from . import views, rating, gmaps, authentication
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    #views.py
    path('hello/', views.hello_world, name='hello_world'),
    path('create_rating/<str:university>/<str:residence_name>/', views.create_rating, name="create_rating"),
    path('update_rating/<str:university>/<str:residence_name>/', views.update_rating, name="update_rating"),
    path('delete_rating/<str:university>/<str:residence_name>/', views.delete_rating, name="delete_rating"),

    #rating.py
    path('get_residences/<str:university>/', rating.get_residences, name="get_residences"),
    path('get_university/', rating.get_university, name="get_university"),
    path('get_residence_info/<str:university>/<str:residence_name>/', rating.get_residence_info, name="get_residences"),
    path('fetch_rating/<str:university>/<str:residence_name>/', rating.fetch_ratings, name = "fetch_rating"),
    path('average_rating/<str:university>/<str:residence_name>/', rating.average_rating, name = "average_rating"),

    #gmaps.py
    path('get_location/<str:residence_name>/', gmaps.get_location, name="get_location"),
    path('get_frontend_key/', gmaps.get_frontend_key, name="get_key"),

    #authenication.py
    path('firebase_key/', authentication.get_firebase_key, name="firebase-key"),
    path('verify_token/', authentication.verify_token, name = "verify_token"),
]
