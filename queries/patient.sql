CREATE TABLE patients
(
    id            VARCHAR(20) PRIMARY KEY,
    first_name    VARCHAR(255) NOT NULL,
    last_name     VARCHAR(255) NOT NULL,
    gender        ENUM('Male', 'Female') NOT NULL,
    date_of_birth DATE         NOT NULL,
    phone_number  VARCHAR(20),
    address       VARCHAR(255)
);