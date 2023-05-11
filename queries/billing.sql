CREATE TABLE billings
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    patient_id     VARCHAR(20)    NOT NULL,
    appointment_id INT            NOT NULL,
    amount         DECIMAL(10, 2) NOT NULL,
    payment_date   DATE           NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments (id) ON DELETE CASCADE
);