from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from db import create_tables, load_data
from store_api import *


app = Flask(__name__) #create Flask instance
CORS(app) #Enable CORS on Flask server to work with Nodejs pages
api = Api(app) #api router

api.add_resource(Store, '/home')
api.add_resource(Login, '/login')
api.add_resource(SignUp, '/signUp')
api.add_resource(getCart, '/cart/<string:param1>')
api.add_resource(Cart, '/cart')
api.add_resource(changeEmail, '/settings')

if __name__ == '__main__':
    print("Loading db");
    create_tables()
    load_data()
    print("Starting flask");
    app.run(debug=True), #starts Flask



