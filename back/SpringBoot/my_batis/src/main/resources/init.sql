-- DROP DATABASE IF EXISTS dev_db;
-- CREATE DATABASE dev_db;
-- USE dev_db;

CREATE TABLE post(
                     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                     createDate DATETIME NOT NULL,
                     modifyDate DATETIME NOT NULL,
                     title CHAR(100) NOT NULL,
                     content TEXT NOT NULL,
                     PRIMARY KEY(id)
);

INSERT INTO post
SET createDate = now(),
modifyDate = now(),
title = '제목 1',
content = '내용 1';

INSERT INTO post
SET createDate = now(),
modifyDate = now(),
title = '제목 2',
content = '내용 2';

CREATE TABLE member(
                       id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                       createDate DATETIME NOT NULL,
                       modifyDate DATETIME NOT NULL,
                       username CHAR(100) NOT NULL UNIQUE,
                       `password` CHAR(100) NOT NULL,
                       name CHAR(100) NOT NULL,
                       email CHAR(100) NOT NULL,
                       PRIMARY KEY(id)
);

INSERT INTO `member`
SET createDate = now(),
modifyDate = now(),
username = 'user1',
`name` = '유저1',
`password`= '{noop}1234',
email = 'user1@test.com';

INSERT INTO `member`
SET createDate = now(),
modifyDate = now(),
username = 'user2',
`name` = '유저2',
`password`= '{noop}1234',
email = 'user2@test.com';