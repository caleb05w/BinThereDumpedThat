import threading, time, serial

import os
import openai
from dotenv import load_dotenv

import base64
import requests

from pymongo import MongoClient
from datetime import datetime

import cv2
import mediapipe as mp

arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=.1) 

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
connection = os.getenv("MONGO_DB_URL")

def read_sensor_data():
    data = arduino.readline().decode('utf-8').rstrip()
    return data

def get_database():
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = connection
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)

   # Create the database for our example (we will use the same database throughout the tutorial
   return client['test']

dbname = get_database()

def edit_database(binType, location, binStatus):
    dbname = get_database()
    collection_name = dbname["bins"]

    #generate some shit
    now = datetime.now()
        
    my_query = {"binType": binType, "location":location}
    
    new_values = {
        "$set": {
            "binStatus": binStatus,  # New value for 'is_full'
            "lastUpdated" : now
        }
    }
    
    collection_name.update_one(my_query, new_values)

def arduino_serial_loop():
    while True:
        sensor_data = read_sensor_data()
        if sensor_data:
            print("Sensor Data:", sensor_data)
            if(int(sensor_data) < 8):
                edit_database(1, "Test location", "full")
            elif(int(sensor_data) > 10):
                edit_database(1, "Test location", "empty")

arduino_serial_loop()


