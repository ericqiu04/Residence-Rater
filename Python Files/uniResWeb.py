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

resLinks = []
residences = []
for i in uniLink:
    r2 = requests.get(i)
    h = r2.content
    soup = BeautifulSoup(h,'html.parser')
    article = soup.find('article')
    t_list = article.find('ul')
    title = soup.find('h3', class_ = 'widget-heading').text
    a = article.find('a', href = lambda href: href and '/residences' in href or '/residence' in href)
    if a is not None:
        href = a['href']
        if '/residences' in href:
            final_href = href.split('/residences')[0] + '/residences'
        else:
            final_href = href.split('/residence')[0] + '/residence'
        resLinks.append({'Uni': title, 'link': final_href})
        uniLink.remove(i)


print(uniLink)

