CREATE DATABASE `education_data`;

USE `education_data`;

CREATE TABLE
    users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tel VARCHAR(20),
        profile_photo VARCHAR(255)
    );

CREATE TABLE
    students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_number VARCHAR(20) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(100) NOT NULL,
        tel VARCHAR(20) NOT NULL,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );