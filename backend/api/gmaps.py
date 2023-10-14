import googlemaps
import json
from django.http import JsonResponse
def get_api_key():
    with open('../credentials/serviceAccountKey.json', 'r') as file:
        data = json.load(file)
        return data.get('api_key')

def get_frontend_key(request):
    with open('../credentials/serviceAccountKey.json', 'r') as file:
        data = json.load(file)
        return JsonResponse({'key':data.get('frontend_key')})

def get_location(request, residence_name):
    try:
        api_key = get_api_key()  # Make sure this function returns the correct API key.
        gmaps = googlemaps.Client(key=api_key)
        print(api_key)
        
        result = gmaps.geocode(residence_name.lower())

        if result:
        # Filter results to include only addresses in Ontario (administrative_area_level_1: ON)
            ontario_results = [r for r in result if any(
            component['short_name'] == 'ON' for component in r.get('address_components', []))]

            if ontario_results:
                address = ontario_results[0]['formatted_address']
                location = ontario_results[0]['geometry']['location']

                response = {
                    'address': address,
                    'location': location
                }
                return JsonResponse(response)
        else:
            return JsonResponse({'error': 'Location not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': 'failed'}, status=500)



