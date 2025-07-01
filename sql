CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE Buses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    busNumber VARCHAR(20),
    totalSeats INT,
    availableSeats INT
);
CREATE TABLE Bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seatNumber INT
);

CREATE TABLE Bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seatNumber INT
);


CREATE TABLE Payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amountPaid DECIMAL(10, 2),
    paymentStatus VARCHAR(50)
);
