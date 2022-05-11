CREATE TABLE Session (
  Id      serial PRIMARY KEY,
  UserId  integer NOT NULL,
  Token   varchar(64) ,
  IP      varchar(45),
  Data    text
);

CREATE TABLE OurUsers (
    id serial primary key,
    email varchar(64) NOT NULL UNIQUE,
    name varchar(64) NOT NULL,
    password varchar(64) NOT NULL,
    UserId int,
    FOREIGN KEY (UserId)  REFERENCES Session (Id) ON DELETE CASCADE
);

