from pymongo import MongoClient

from dotenv import load_dotenv
import os

from datetime import datetime

load_dotenv()

connection = os.getenv("MONGO_DB_URL")

print(connection)

def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = connection
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)

   # Create the database for our example (we will use the same database throughout the tutorial
   return client['test']

dbname = get_database()

def add_database(binType, location, binStatus):
    dbname = get_database()
    collection_name = dbname["bins"]
    now = datetime.now()

    can_0 = {
        "lastUpdated" : now,
        "location" : location,
        "binType" : binType,
        "binStatus" : binStatus
    }

    collection_name.insert_one(can_0)

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

#add_database(1, "round the courner", "full")
edit_database(2, "Shrum Science Center C9002", "Full")
