import requests
import json

# save api endpoint response to json file https://restcountries.com/v3.1/all

def get_country_data():
    response = requests.get('https://restcountries.com/v3.1/all')
    response.raise_for_status()
    return response.json()

def save_country_data():
    with open('countrydata.json', 'w') as f:
        json.dump(get_country_data(), f, indent=4)

if __name__ == '__main__':
    save_country_data()
    

