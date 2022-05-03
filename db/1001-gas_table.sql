CREATE TABLE `gases` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `img_url` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `oils_status_IDX` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
-- Populate initial data
--  Auto-generated SQL script #202204301916
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('DIESEL_PRIMIUM_B7','Diesel B7 Premium');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('DIESEL_B7','Diesel B7');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('DIESEL_B10','Diesel B10');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('Diesel_B20','Diesel B20');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('BENZENE_GAS_E85','Gasohol E85');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('BENZENE_GAS_E20','Gasohol E20');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('BENZENE_GAS_91','Gasohol 91');
INSERT INTO noty_dev.gases (name,display_name)
	VALUES ('BENZENE_GAS_95','Gasohol 95');