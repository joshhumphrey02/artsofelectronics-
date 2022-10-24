

/*
*************  Customers Table

sql = "CREATE TABLE Customers( user_id INT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100), birth_day DATE, sex VARCHAR(1), picture BLOB, password VARCHAR(180), type VARCHAR(6))";


*********   Product Table
sql = "CREATE TABLE Products( product_id INT PRIMARY KEY, name VARCHAR(100), price INT(7), sub_category VARCHAR(100), category VARCHAR(100), image BLOB, description TEXT)"

**********  Cart Table
sql = "CREATE TABLE Cart( cart_id INT PRIMARY KEY , user_id INT, product_id INT, product_qty INT, checked TINYINT, FOREIGN KEY(user_id) REFERENCES Customers(user_id) ON DELETE CASCADE, FOREIGN KEY(product_id) REFERENCES Products(product_id) ON DELETE SET NULL)"

***********  Address Table
sql = "CREATE TABLE address(address_id INT PRIMARY KEY, user_id INT, country VARCHAR(12), state VARCHAR(10), lga VARCHAR(12), street VARCHAR(50), phone INT(15), prefered TINYINT DEFAULT false, FOREIGN KEY(user_id) REFERENCES Customers(user_id) ON DELETE CASCADE)"

**********   Wish list Table
sql = "CREATE TABLE favorite(fav_id INT , user_id INT, product_id INT, FOREIGN KEY(user_id) REFERENCES Customers(user_id) ON DELETE CASCADE, FOREIGN KEY(product_id) REFERENCES Products(product_id) ON DELETE CASCADE)"

***********   Transaction Table
sql = "CREATE TABLE transactions(trans_id INT PRIMARY KEY, user_id INT, products VARCHAR(50), email VARCHAR(50), session VARCHAR(50), amount INT, status VARCHAR(10) DEFAULT 'pending', FOREIGN KEY(user_id) REFERENCES customers(user_id) ON DELETE SET NULL)"

************ Reviews Table
sql = "CREATE TABLE reviews(rev_id INT PRIMARY KEY, user_id INT, product_id INT, rating int(6), comment VARCHAR(10), description TEXT, FOREIGN KEY(user_id) REFERENCES Customers(user_id) ON DELETE CASCADE, FOREIGN KEY(product_id) REFERENCES Products(product_id) ON DELETE CASCADE)"

*********  Orders Table
sql = "CREATE TABLE orders(order_id INT PRIMARY KEY, trans_id INT, status VARCHAR(15) DEFAULT 'shipped', FOREIGN KEY(trans_id) REFERENCES  transactions(trans_id) ON DELETE CASCADE)"

customer needs id manually
products
transactions


*/


// const { db } = require('./database');

// db(sql, null, (err)=>{
//     console.log('created')
// })
// let sql = "INSERT INTO products SET?";
// let data = {
//     product_id: "",
//     name: "",
//     price: "",
//     sub_category: "",
//     category: "",
//     image: "",
//     description: ""
// }