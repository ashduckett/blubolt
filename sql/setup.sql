/*
    Create a table to store enquiries. For the enquiry itself, use the TEXT type which I think stores 65,535 characters,
    which should be more than enough. Nothing here should be null and the front-end won't allow that either.
*/
CREATE TABLE Enquiry (
    ID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Enquiry TEXT NOT NULL,
    PRIMARY KEY (ID)
);