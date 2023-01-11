import feedparser
import boto3
import json
from datetime import datetime, date, timedelta
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()
DB_STRING = os.getenv('DB_STRING')
ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
SECRET_KEY = os.getenv('AWS_SECRET_KEY')

client = MongoClient(DB_STRING, 
server_api=ServerApi('1'))
db = client.test
collection = db.test_collection

scraped = False
translated = False

def scrapeSources():

  global scraped

  dict = {}
  now = datetime.now()
  time1 = now.strftime('%H:%M')
  char_counter = 0
  date = now.strftime('%d-%m-%y')

  try:
    with open('../data/sourceLinks.json') as parsed:
      json_obj = json.load(parsed)

      for elem in json_obj.items():
        dict[elem[0]] = []
        for link in elem[1].values():
          try:
            feed = feedparser.parse(link)
            topHeadlines = []
          except:
            continue

          try:
            for entry in feed.entries:
              if len(topHeadlines) > 2:
                break
              if len(entry.title) > 60 or len(entry.title) < 5:
                continue
              else : 
                char_counter = char_counter + len(entry.title)
                topHeadlines.append(entry.title)
                dict[elem[0]].append(entry.title)
          except:
            continue

        with open(f"../data/{date}.json", "w") as outfile:
          json.dump(dict, outfile, ensure_ascii=False)

      newNow = datetime.now()

      print(f'Time 1 : {time1}')
      print(newNow.strftime('Time 2 : %H:%M'))
      print(f'Characters {char_counter}')

      scraped = True
  except:
    print(Exception)

def translateHL():
  processedJSON = open("../data/TODAY/processed.json", "w")
  json.dump(dict, processedJSON, ensure_ascii=False)

  today_HL = {}

  client = boto3.client(
    'translate',
    region_name='eu-west-1',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,)

  try:
    response = client.translate_text(
      Text = HLcoll,
      SourceLanguageCode = 'auto',
      TargetLanguageCode = 'en'
    )
    return response['TranslatedText']
  except Exception as e:
    print(e)

def sentimentHL():
  # processedJSON = open("../data/TODAY/processed.json", "w")
  # json.dump(dict, processedJSON, ensure_ascii=False)

  today_HL = {}

  client = boto3.client(
    'comprehend',
    region_name='eu-west-1',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,)

  try:
    response = client.detect_sentiment(
      Text = "I love you but you're toxic",
      LanguageCode = 'en'
    )
    print(response['SentimentScore'])
  except Exception as e:
    print(e)

def createIndex():
  print('idx')

def cleaner():
  yesterday = date.today() - timedelta(days=1)
  yesterday_parsed = yesterday.strftime('%d-%m-%y')

  try:
    if os.path.exists(f"../data/{yesterday_parsed}.json"):
      print('exists')
      # To implement after making sure the DB has a file from that date
      # os.remove("demofile.txt")
  except:
    pass

def streamLine():

  global scraped
  global translated

  scrapeSources()

  if scraped:
    translateHL()

  if translated:
    createIndex()

cleaner()

# CHECKER FOR INDIVIDUAL LINKS FOR MANUAL GATHERING

# feed = feedparser.parse('http://en.althawranews.net//feed')
# topHeadlines = []
# try:
#   for entry in feed.entries:
#     if len(topHeadlines) > 5:
#       break
#     else : 
#       topHeadlines.append(entry.title)
#   if len(topHeadlines) != 0:
#     pp(topHeadlines,indent=2)
# except:
#   print('Error')