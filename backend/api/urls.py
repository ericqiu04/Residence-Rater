from django.urls import path
from . import views, rating, gmaps, authentication
from django.views.decorators.csrf import csrf_exempt

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('register/', views.user_register, name = "user_register"),
    path('login/', views.user_login, name = "user_login"),
    path('user/<str:username>/', csrf_exempt(views.user_profiles), name = "user_profiles"),
    path('create_rating/<str:university>/<str:residence_name>/', views.create_rating, name = "create_rating"),
    path('update_rating/<str:university>/<str:residence_name>/', views.update_rating, name = "update_rating"),
    path('delete_rating/<str:university>/<str:residence_name>/', views.delete_rating, name = "delete_rating"),
    path('get_residences/<str:university>/', rating.get_residences, name = "get_residences"),
    path('get_university/', rating.get_university, name = "get_university"),
    path('get_residence_info/<str:university>/<str:residence_name>/', rating.get_residence_info, name = "get_residences"),
    path('get_location/<str:residence_name>/', gmaps.get_location, name = "get_location"),
    path('get_frontend_key/', gmaps.get_frontend_key, name = "get_key"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('firebase-config/', authentication.get_firebase_config, name = "firebase-config" )
]