import firebase_admin
from firebase_admin import credentials, firestore
import bcrypt

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated



cred = credentials.Certificate("../credentials/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://ontario-residence-rater.firebaseio.com"}
)
db = firestore.client()
user_ref = db.collection("users")

class FirebaseConfigView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        with open('../credentials/serviceAccountKey.json', 'r') as file:
            data = json.load(file)
            key = data.get('api_key')
            firebase_config = {
                'apiKey': key,
                'authDomain': 'ontario-residence-rater.firebaseapp.com',
                'projectId': 'ontario-residence-rater',
                'storageBucket': 'ontario-residence-rater.appspot.com',
                'messagingSenderId': '1067956136255',
                'appId': '1:1067956136255:web:6fc048b52889a6cde18b8a',
            }   
            return Response(firebase_config)
    
        


def register(username, first_name, last_name, email, password, confirm_password):
    
    user_id = username.upper()

    #checks for availability
    if(confirm_password != password):
        return {"error": "passwords do not match"}
    if check_email(email):
        return {"error" : "email in use"}
    if check_username(user_id):
        return {'error': 'username taken'}
    

    h_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    #storing to database
    user_ref.document(user_id).set({
        'username' : user_id,
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'password': h_password.decode('utf-8')
    })
    sign_in()
    return {'message': 'Registration Success', 'id': username, "signin?": logged_in}
    

def login(username, password):
    if not check_username(username.upper()):
        return {'message': 'incorrect username'}
    
    user_data = user_ref.document(username.upper()).get()
    h_password = user_data.to_dict().get('password')
    
    #checks for password matching
    if bcrypt.checkpw(password.encode('utf-8'), h_password.encode('utf-8')):
        sign_in()
        return {'message': "login successful", "signin?": logged_in}
    else:
        return {'error': "password incorrect", "signin?": logged_in}
    
def update_user(user, new_data):
    user_data = user_ref.document(user.upper())
    current_data = user_data.get().to_dict()
    if not current_data:
        return False
    updated_data = {**current_data, **new_data}
    user_data.update(updated_data)

    return True

def delete_data(user):
    user_data = user_ref.document(user.upper()).get()

    if not user_data.exists:
        return False
    
    user_ref.document(user.upper()).delete()
    return {'Message': 'User has been deleted', 'username': user}


def sign_in():
    global logged_in
    logged_in = True
    
def sign_out():
    global logged_in
    logged_in = False

def check_email(email):
    query = user_ref.where('email', '==', email).get()
    print(query)
    return len(query) > 0

def check_username(user):
    user_data = user_ref.document(user.upper()).get()
    if user_data.exists:
        return True
    else:
        return False

def get_user(user):
    print(user)
    user_data = user_ref.document(user.upper()).get()
    if user_data.exists:
        return user_data.to_dict()
    else:
        return None

