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
        parser.add_argument('userid', type=str)
        parser.add_argument('id', type=int)
        parser.add_argument('price', type=int)
        args = parser.parse_args()
        userid = args['userid']
        id = args['id']
        price = args['price']
        print(userid)
        total = exec_get_all("SELECT total FROM cartTotal WHERE userid=%s", [userid])
        if len(total) != 0:  
            total = total[0]
            new_total = float(total[0] + price)
            exec_commit("UPDATE cartTotal SET total=%s WHERE userid=%s", [new_total, userid])
        else:
            exec_commit("INSERT INTO cartTotal VALUES(%s, %s)", [price, userid])
        exec_commit("INSERT INTO cart VALUES(1, %s, %s)", [id, userid])

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
        result = exec_get_one("SELECT password, userid FROM user WHERE email=%s", [email])
        if result:
            print(result)
            if result[0] == hashedPassword:
                session_key = str(random.getrandbits(128))
                return [session_key, result[1]]
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
        cart = exec_get_all("SELECT userid FROM cart WHERE userid=%s", [param1])
        print("cart", cart)
        if len(cart)!= 0:
           result = exec_get_all("SELECT inventory.name, inventory.price, inventory.imageName, cart.quantity, cartTotal.total, cart.id FROM cart INNER JOIN inventory ON cart.id=inventory.id INNER JOIN cartTotal ON cart.userid=cartTotal.userid WHERE cart.userid=%s", [param1])
           return result 
        else:
            return 'empty'

class Cart(Resource):
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('userid', type=str)
        parser.add_argument('id', type=int)
        parser.add_argument('price', type=int)
        args = parser.parse_args()
        userid = args['userid']
        id = args['id']
        price = args['price']
        exec_commit('DELETE FROM cart WHERE userid=%s AND id=%s', [userid, id])
        total = exec_get_all("SELECT total FROM cartTotal WHERE userid=%s", [userid]) 
        total = total[0]
        new_total = float(total[0] - price)
        exec_commit("UPDATE cartTotal SET total=%s WHERE userid=%s", [new_total, userid])
        cart = exec_get_all("SELECT * FROM cart WHERE userid=%s", [userid])
        if len(cart)!= 0:
           result = exec_get_all("SELECT inventory.name, inventory.price, inventory.imageName, cart.quantity, cartTotal.total, cart.id FROM cart INNER JOIN inventory ON cart.id=inventory.id INNER JOIN cartTotal ON cart.userid=cartTotal.userid WHERE cart.userid=%s", [userid])
           return result 
        else:
            return 'empty'

class changeEmail(Resource):
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('userid', type=str)
        parser.add_argument('email', type=str)
        args = parser.parse_args()
        userid = args['userid']
        email = args['email']
        exec_commit("UPDATE user SET email=%s WHERE userid=%s", [email, userid])
        result = exec_get_all("SELECT email FROM user WHERE userid=%s", [userid])
        return result
    
    