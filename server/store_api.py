from flask_restful import Resource, request, reqparse
import json
from db import *
import hashlib, random



class Store(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM inventory;")
        return result

class Login(Resource):
    def post(self):
        print("here")
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        email = args['email']
        password = args['password'].encode()
        hasher = hashlib.sha512(password)
        hasher.update(password)
        hashedPassword = hasher.hexdigest()
        result = exec_get_one("SELECT password FROM user WHERE email=%s", [email])
        if result:
            if result[0] == hashedPassword:
                session_key = str(random.getrandbits(128))
                return session_key
        return 'Login failed', 401

class SignUp(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        email = args['email']
        password = args['password'].encode()
        hasher = hashlib.sha512(password)
        hasher.update(password)
        hashedPassword = hasher.hexdigest()
        result = exec_commit("INSERT INTO user VALUES(%s, %s)", [email, hashedPassword])
        if result:
            session_key = str(random.getrandbits(128))
            return session_key
        return 'Sign up failed', 409 
