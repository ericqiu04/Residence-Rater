import requests
from bs4 import BeautifulSoup

url = "https://www.ontariouniversitiesinfo.ca/universities/waterloo/residences"

response = requests.get(url)
html = response.content

bs = BeautifulSoup(html, 'html.parser')
div = bs.find(class_ = "university-dropdown")

uniLink = []

atag = div.find_all('a')

print(atag)
for a in atag:
    uniLink.append('https://www.ontariouniversitiesinfo.ca' + a['href'])

print(uniLink)