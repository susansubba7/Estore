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

#creates a user table in a database called store that already exists in the mySQL server
def create_tables():
    conn = connect()
    db_cursor = conn.cursor()
    db_cursor.execute("DROP TABLE IF EXISTS user, inventory, cart, cartTotal;")
    db_cursor.execute(
    """
    CREATE TABLE user(
        userid int NOT NULL Auto_INCREMENT,
        email varchar(120),
        password LONGTEXT,
        PRIMARY KEY (userid)
    );
    """)
    conn.commit()
    db_cursor.execute( """
    CREATE TABLE inventory(
        id int NOT NULL Auto_INCREMENT,
        name varchar(120),
        price FLOAT(4, 2) ,
        inStock int,
        imageName varchar(120),
        description varchar(500),
        PRIMARY KEY (id)
    );""")
    conn.commit()
    db_cursor.execute("""
    CREATE TABLE cart(
        quantity int,
        id int,
        userid int NOT NULL,
        PRIMARY KEY (userid, id),
        FOREIGN KEY (id) REFERENCES inventory(id),
        FOREIGN KEY (userid) REFERENCES user(userid)
    );""")
    conn.commit()
    db_cursor.execute("""
    CREATE TABLE cartTotal(
        total FLOAT(6, 2),
        userid int NOT NULL,
        PRIMARY KEY (userid),
        FOREIGN KEY (userid) REFERENCES user(userid)
    );""")
    conn.commit()
    conn.close()

def load_data():
    conn = connect()
    db_cursor = conn.cursor()
    db_cursor.execute("""INSERT INTO user(email, password) VALUES('susansubba', '60c63b81f06374346a8b838dd656c79d1843038781f61c47c8b174672552c226d9ebf05ba7cf692fb33ca495f4f424e1e5f76b3e58241ad08c80d243d495268e')""")
    conn.commit()
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Real Madrid 22/23 Home Jersey ', 90.99, 1, 'Real_Madrid_Home.png', "Official Adidas Men's Real Madrid home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['FC Barcelona 22/23 Home Jersey ', 90.99, 1, 'Barcelona.png', "Official Nike Men's Fc Barcelona home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['PSG 22/23 Home Jersey ', 90.99, 1, 'PSG.png', "Official Nike Men's Paris Saint-Germain F.C. home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Manchester City 22/23 Home Jersey ', 90.99, 1, 'ManCity.png', "Official Puma Men's Manchester City. home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Juventus 22/23 Home Jersey ', 90.99, 1, 'Juventus.png', "Official Adidas Men's Juventus. home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Spurs 22/23 Home Jersey ', 90.99, 1, 'Spurs.png', "Official Nike Men's Spurs. home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Athletico Madrid 22/23 Home Jersey ', 90.99, 1, 'AthleticoMadrid.png', "Official Nike Men's Athletico Madrid. home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Manchester United 22/23 Home Jersey ', 90.99, 1, 'ManU.png', "Official Adidas Men's Manchester City. home soccer jersey for the 2022-2023 season"])
    db_cursor.execute("""INSERT INTO inventory(name, price, inStock, imageName, description) VALUES(%s, %s, %s, %s, %s)""", ['Chelsea 22/23 Home Jersey ', 90.99, 1, 'Chelsea.png', "Official Nike Men's Chlesea. home soccer jersey for the 2022-2023 season"])
    conn.commit()
    conn.close()

#commits to database with the give sql statement and arguments
def exec_commit(sql, args={}):
    try:
        conn = connect()
        db_cursor = conn.cursor()
        data = db_cursor.execute(sql, args)
        conn.commit()
        conn.close()
        return data
    except mysql.connector.IntegrityError as err:
        return False

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