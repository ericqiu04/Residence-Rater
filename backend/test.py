import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('../credentials/serviceAccountKey.json')

try:
    firebase_admin.initialize_app(cred)
except Exception as e:
    print("Firebase initialization error:", str(e))

# Check if Firebase app is initialized
if firebase_admin._apps:
    print("Firebase is initialized.")
else:
    print("Firebase is not initialized.")
    
if firebase_admin._apps:
    # Initialize Firestore
    db = firestore.client()

    # Define a test document reference
    doc_ref = db.collection("test_collection").document("test_document")
    
    try:
        # Write data to Firestore
        data_to_write = {"field1": "value1", "field2": "value2"}
        doc_ref.set(data_to_write)
        print("Data written to Firestore.")

        # Read data from Firestore
        doc_snapshot = doc_ref.get()
        if doc_snapshot.exists:
            data_read = doc_snapshot.to_dict()
            print("Data read from Firestore:", data_read)
        else:
            print("Document does not exist.")

        # Clean up: Delete the test document (optional)
        # doc_ref.delete()
        # print("Document deleted.")
    except Exception as e:
        print("Firestore operation error:", str(e))
else:
    print("Firebase app is not initialized.")

# Terminate the Firebase app (recommended at the end of your script)
firebase_admin.delete_app(firebase_admin._apps[0])