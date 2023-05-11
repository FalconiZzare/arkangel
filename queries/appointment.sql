CREATE TABLE appointments
(
    id               INT PRIMARY KEY AUTO_INCREMENT,
    patient_id       VARCHAR(20) NOT NULL,
    doctor_id        VARCHAR(20) NOT NULL,
    appointment_date DATETIME    NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
);