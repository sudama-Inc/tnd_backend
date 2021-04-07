/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS customer (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    nick_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    education VARCHAR(50) NOT NULL,
    occupation VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    hobbies VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);