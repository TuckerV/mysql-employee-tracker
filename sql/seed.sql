
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO department(name)
VALUES("Dev Ops");

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT(10) NOT NULL
);

INSERT INTO role(title, salary, department_id)
VALUES("Developer", 75000, 1);

INSERT INTO role(title, salary, department_id)
VALUES("QA", 90000, 1);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Tucker", "Vassau", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Cait", "Vassau", 2, 1);