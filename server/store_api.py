from flask_restful import Resource, request, reqparse
import json
from db import *
import hashlib, random



class Store(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM inventory;")
        return result

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('id', type=int)
        parser.add_argument('price', type=int)
        args = parser.parse_args()
        email = args['email']
        id = args['id']
        price = args['price']
        total = exec_get_all("SELECT total FROM cartTotal WHERE email=%s", [email])
        if len(total) != 0:  
            total = total[0]
            new_total = float(total[0] + price)
            exec_commit("UPDATE cartTotal SET total=%s WHERE email=%s", [new_total, email])
        else:
            exec_commit("INSERT INTO cartTotal VALUES(%s, %s)", [price, email])
        exec_commit("INSERT INTO cart VALUES(1, %s, %s)", [id, email])

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

class getCart(Resource):
    def get(self, param1):
        cart = exec_get_all("SELECT * FROM cart WHERE email=%s", [param1])
        if len(cart)!= 0:
           result = exec_get_all("SELECT inventory.name, inventory.price, inventory.imageName, cart.quantity, cartTotal.total, cart.id FROM cart INNER JOIN inventory ON cart.id=inventory.id INNER JOIN cartTotal ON cart.email=cartTotal.email WHERE cart.email=%s", [param1])
           return result 
        else:
            return 'empty'

class Cart(Resource):
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('id', type=int)
        parser.add_argument('price', type=int)
        args = parser.parse_args()
        email = args['email']
        id = args['id']
        price = args['price']
        exec_commit('DELETE FROM cart WHERE email=%s AND id=%s', [email, id])
        total = exec_get_all("SELECT total FROM cartTotal WHERE email=%s", [email]) 
        total = total[0]
        new_total = float(total[0] - price)
        exec_commit("UPDATE cartTotal SET total=%s WHERE email=%s", [new_total, email])
        cart = exec_get_all("SELECT * FROM cart WHERE email=%s", [email])
        if len(cart)!= 0:
           result = exec_get_all("SELECT inventory.name, inventory.price, inventory.imageName, cart.quantity, cartTotal.total, cart.id FROM cart INNER JOIN inventory ON cart.id=inventory.id INNER JOIN cartTotal ON cart.email=cartTotal.email WHERE cart.email=%s", [email])
           return result 
        else:
            return 'empty'
        
        
    
    