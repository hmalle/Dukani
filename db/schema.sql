
DROP DATABASE IF EXISTS biasharaDB;

CREATE DATABASE biasharaDB;

USE biasharaDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  product_sales INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT NOT NULL DEFAULT 100
);
