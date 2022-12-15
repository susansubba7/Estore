from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from db import create_tables, load_data
from store_api import *


app = Flask(__name__) #create Flask instance
CORS(app) #Enable CORS on Flask server to work with Nodejs pages
api = Api(app) #api router

api.add_resource(Store, '/')

if __name__ == '__main__':
    print("Loading db");
    create_tables()
    load_data()
    print("Starting flask");
    app.run(port=4999, debug=True,), #starts Flask



