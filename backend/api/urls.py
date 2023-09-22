from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('register/', views.user_register, name = "user_register"),
    path('login/', views.user_login, name = "user_login"),
    path('user/<str:username>/', csrf_exempt(views.user_profiles), name = "user_profiles"),
    path('create_rating/<str:university>/<str:residence_name>/', views.create_rating, name = "create_rating"),
    path('update_rating/<str:university>/<str:residence_name>/', views.update_rating, name = "update_rating"),
    path('delete_rating/<str:university>/<str:residence_name>/', views.delete_rating, name = "delete_rating")
]