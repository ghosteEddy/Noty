CREATE TABLE noty_dev.gas_prices (
	id BIGINT auto_increment NOT NULL,
	gas_id BIGINT NOT NULL,
	today_price DECIMAL(19,2) NOT NULL,
	tomorrow_price DECIMAL(19,2) NOT NULL,
	source ENUM('other','bcp') DEFAULT 'other' NOT NULL,
	updated TIMESTAMP DEFAULT current_timestamp() NULL,
	CONSTRAINT gas_prices_PK PRIMARY KEY (id),
	CONSTRAINT gas_prices_FK FOREIGN KEY (id) REFERENCES noty_dev.gases(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
CREATE INDEX gas_prices_gas_id_IDX USING BTREE ON noty_dev.gas_prices (gas_id);
