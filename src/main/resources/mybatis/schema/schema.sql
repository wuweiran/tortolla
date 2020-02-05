CREATE SCHEMA `tortolla` DEFAULT CHARACTER SET utf8mb4;
USE tortolla;

CREATE TABLE blogger (
	id BIGINT(20) not null auto_increment,
	username VARCHAR(100) not null,
	password_hash VARCHAR(200) not null,
	full_name VARCHAR(200),
	created_time TIMESTAMP not null,
	primary key(id),
	unique key(username)
);

CREATE TABLE post (
	id BIGINT(30) not null auto_increment,
	title VARCHAR(100),
	body TEXT,
	author_id BIGINT(20) not null,
	created_time TIMESTAMP not null,
	last_modified_time TIMESTAMP not null,
	primary key(id)
);