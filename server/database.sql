CREATE DATABASE vietbigtwo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE friendRequests (
    request_id uuid DEFAULT uuid_generate_v4(),
    user_sender uuid NOT NULL REFERENCES users(user_id),
    user_receiver uuid NOT NULL REFERENCES users(user_id),
    PRIMARY KEY (request_id)
);

CREATE TABLE friendships (
    friendship_id uuid DEFAULT uuid_generate_v4(),
    user_A uuid NOT NULL REFERENCES users(user_id),
    user_B uuid NOT NULL REFERENCES users(user_id),
    PRIMARY KEY (friendship_id)
);