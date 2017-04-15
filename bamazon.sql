-- Created the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all the following code will affect bamazon database --
USE bamazon;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(80) NOT NULL,
	department_name VARCHAR(80) NOT NULL,
	price DECIMAL(11,2) NOT NULL,
	stock_quantity INT(11) NOT NULL,
	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO `products` (product_name, department_name, price, stock_quantity)
VALUES 
("Apple MacBook Pro 15.4-inch ", "Computers", 2249.00, 100),
("Lenovo Ideapad 700", "Computers", 962.91, 1000),
("Code: The Hidden Language..", "Books", 19.95, 80),
("Cracking the Tech Career: Insider Advice on Landing a Job", "Books", 17.63, 50),
("Apple iPhone 7 Plus Unlocked Phone 32 GB", "Cell Phones & Accessories", 829.00, 41),
("Samsung Galaxy S7 G930V 32GB Smartphone", "Cell Phones & Accessories", 355.00, 27),
("THE PURPLE PILLOW", "Home & Kitchen", 99.00, 50),
("KitchenAid  5-Qt", "Home & Kitchen", 280.45, 100),
("DeepBassX Beats HD Stereo Sound Headphones", "Cell Phones & Accessories", 159.95, 50),
("Fitbit Charge 2 Heart Rate Black", "Electronics", 148.85, 45);

SELECT * FROM products;


















