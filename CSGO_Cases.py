from bs4 import BeautifulSoup
import requests
import json
import pandas as pd

url = 'https://steamcommunity.com/market/search/render/?query=Case&start=1&count=40&search_descriptions=0&sort_column=default&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Type%5B%5D=tag_CSGO_Type_WeaponCase'


def get_data(url):
    r = requests.get(url)
    data = dict(r.json())
    return data['results_html']


def parse(data):
    itemsList = []
    soup = BeautifulSoup(data, 'html.parser')
    items = soup.find_all('a')
    for item in items:
        title = item.find('span', {'class' : 'market_listing_item_name'}).text
        price =  item.find('span', {'class' :'sale_price'}).text.strip().split('$')[1]
        # print(title,price)

        MarketItems = {
            'Title': title,
            'Price': price
        }
        itemsList.append(MarketItems)

    return itemsList

def output(itemsList):
    with open('CasePrices.json', 'w') as f:
        json.dump(itemsList, f, indent= 2)
    print('Complete!')
    return

data = get_data(url)
itemsList = parse(data)
output(itemsList)