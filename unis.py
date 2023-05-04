import re
import requests
from bs4 import BeautifulSoup

url = "https://www.ontariouniversitiesinfo.ca/programs/universities"

response = requests.get(url)
html = response.content

bs = BeautifulSoup(html, 'html.parser')
divs = bs.find_all(class_='result-heading')

universities = []

for div_e in divs:
    atag = div_e.find_all('a')

    for a in atag:
        universities.append(a.text)


with open('uni_list.js','w') as file:
    file.write('export const universities = [ \n')
    for u in universities:
        index = universities.index(u)+1
        u = u.replace("'", "\\'")
        file.write('{ \n id:' + str(index) + ',\nname: ' + '\'' + str(u) + '\',\n }, \n')

    file.write(']')


