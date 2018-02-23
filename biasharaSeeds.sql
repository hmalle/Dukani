
DROP DATABASE IF EXISTS biasharaDB;

CREATE DATABASE biasharaDB;

USE biasharaDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO  products(product, department, price, stock) 
VALUES("A super computer", "Electronics", 999.00,10);

