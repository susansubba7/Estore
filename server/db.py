import connector
import mysql.connector
def connect():
    info = connector.connection()
    mydb = mysql.connector.connect(
        host=info["host"],
        user=info["user"],
        passwd=info["password"],
        database=info["database"]
    )
    return mydb

#creates a user table in a database that called store that already exists in the mySQL server
def create_tables():
    conn = connect()
    db_cursor = conn.cursor()
    db_cursor.execute("DROP TABLE IF EXISTS user, inventory;")
    db_cursor.execute(
    """
    CREATE TABLE user(
        username varchar(120),
        password varchar(120),
        PRIMARY KEY (username)
    );
    """)
    conn.commit()
    db_cursor.execute( """
    CREATE TABLE inventory(
        id int,
        name varchar(120),
        price FLOAT(4, 2) ,
        inStock int,
        PRIMARY KEY (id)
    );""")
    conn.commit()
    conn.close()

def load_data():
    conn = connect()
    db_cursor = conn.cursor()
    db_cursor.execute("""INSERT INTO user VALUES('susansubba', 'password1234')""")
    conn.commit()
    db_cursor.execute("""INSERT INTO inventory VALUES(%s, %s, %s, %s)""", [1001, 'iphone', 90.00, 1])
    conn.commit()
    conn.close()

#commits to database with the give sql statement and arguments
def exec_commit(sql, args={}):
    conn = connect()
    db_cursor = conn.cursor()
    data = db_cursor.execute(sql, args)
    conn.commit()
    conn.close()
    return data

#gets one data from database after executing give sql statement and arguments
def exec_get_one(sql, args={}):
    conn = connect()
    db_cursor = conn.cursor()
    db_cursor.execute(sql, args)
    data = db_cursor.fetchone()
    conn.close()
    return data

#gets all data from database after executing give sql statement and arguments
def exec_get_all(sql, args={}):
    conn = connect()
    db_cursor = conn.cursor()
    db_cursor.execute(sql, args)
    data = db_cursor.fetchall()
    conn.close()
    return data

if __name__ == "__main__":
    create_tables()