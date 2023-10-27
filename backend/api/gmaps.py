import googlemaps
from django.http import JsonResponse
import json
def get_api_key():
    with open('../credentials/serviceAccountKey.json', 'r') as file:
        data = json.load(file)
        return data.get('api_key')

def get_frontend_key(request):
    key = get_api_key()
    print(key)
    return JsonResponse({'key': key})

def get_location(request, residence_name):
    try:
        api_key = get_api_key()
        gmaps = googlemaps.Client(key=api_key)
        result = gmaps.geocode(residence_name.lower())
        if result:
            ontario_results = [r for r in result if any(
            component['short_name'] == 'ON' for component in r.get('address_components', []))]

            if ontario_results:
                address = ontario_results[0]['formatted_address']
                location = ontario_results[0]['geometry']['location']

                response = {
                    'address': address,
                    'location': location
                }
                return JsonResponse({'address': address, 'location': location})
       
    except Exception as e:
        return e
