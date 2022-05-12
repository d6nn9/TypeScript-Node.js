CREATE TABLE OurUsers (
    Id serial PRIMARY KEY,
    Email varchar(64) NOT NULL UNIQUE CHECK(Email LIKE '%_@__%.__%'),
    Name varchar(64) NOT NULL,
    Password varchar(64) NOT NULL,
    Age INT DEFAULT 18 CHECK(
        Age > 0
        AND Age < 100
    )
);

CREATE TABLE Session (
    Id serial PRIMARY KEY,
    UserId int NOT NULL,
    Token varchar(64),
    IP varchar(45),
    Data text,
    FOREIGN KEY (UserId) REFERENCES OurUsers (Id) ON DELETE CASCADE
);