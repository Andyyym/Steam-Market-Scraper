from bs4 import BeautifulSoup
import requests
import json

# EXAMPLE LINK: https://steamcommunity.com/market/search?appid=730&q=LIQUID+FIRE+HOLO

Itemlinks = ['INSERT LINKS HERE']

Itmes = []

for link in Itemlinks:

    r = requests.get(link)

    soup = BeautifulSoup(r.content, 'lxml')

    name = soup.find('span', class_='market_listing_item_name').text.strip()
    price = soup.find('span', class_='sale_price').text.strip()

    ItemSet = ({

        'Name': name,
        'Price': price,
    })

    Itmes.append(ItemSet)
    print('Saving: ', ItemSet['Name'])

    with open('Output.json', 'w') as f:
        json.dump(Itmes, f, indent= 2)