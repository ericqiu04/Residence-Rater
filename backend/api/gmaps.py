import googlemaps

api_key = get_api_key()
if(api_key):
    gmaps = googlemaps.Client(key = api_key)

def get_location(request, residence_name):
    geo_result = gmaps.geocode(residence_name)

    if geo_result:
        

def get_api_key():
    try:
        with open('../credentials/serviceAccountKey.json', 'r') as file:
            data = json.load(file)
            return data.get('api_key')
    else:
        return False


