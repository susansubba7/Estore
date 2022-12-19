from flask_restful import Resource, request, reqparse
import json
from db import *

class Store(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM inventory;")
        return result