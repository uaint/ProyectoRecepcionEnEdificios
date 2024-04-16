-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema roentgenium
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema roentgenium
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `roentgenium` DEFAULT CHARACTER SET utf8 ;
USE `roentgenium` ;

-- -----------------------------------------------------
-- Table `roentgenium`.`visitors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`visitors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(31) NOT NULL,
  `last_name` VARCHAR(31) NOT NULL,
  `run` INT NOT NULL,
  `run_vd` TINYINT(1) NOT NULL,
  `birth_date` DATE NOT NULL,
  `last_visit` DATETIME NULL,
  `visit_type` VARCHAR(31) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`vehicles_visitors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`vehicles_visitors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visitor_id` INT NOT NULL,
  `license_plate` VARCHAR(8) NOT NULL,
  `parking_spot` SMALLINT NULL,
  `parking_date` DATETIME NULL,
  PRIMARY KEY (`id`, `visitor_id`),
  INDEX `fk_vehicle_registry_visitors_visitors1_idx` (`visitor_id` ASC) VISIBLE,
  UNIQUE INDEX `parking_spot_UNIQUE` (`parking_spot` ASC) VISIBLE,
  CONSTRAINT `fk_vehicle_registry_visitors_visitors1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `roentgenium`.`visitors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`inhabitants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`inhabitants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apartment` TINYINT NOT NULL,
  `housing_unit` SMALLINT NULL,
  `first_name` VARCHAR(31) NOT NULL,
  `last_name` VARCHAR(31) NOT NULL,
  `run` INT NOT NULL,
  `run_vd` TINYINT(1) NOT NULL,
  `contact_number` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`mail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`mail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inhabitant_id` INT NOT NULL,
  `mail_type` VARCHAR(31) NOT NULL,
  `arrival_time` DATETIME NOT NULL,
  `is_claimed` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`, `inhabitant_id`),
  INDEX `fk_Incoming_Mail_inhabitants_idx` (`inhabitant_id` ASC) VISIBLE,
  CONSTRAINT `fk_Incoming_Mail_inhabitants`
    FOREIGN KEY (`inhabitant_id`)
    REFERENCES `roentgenium`.`inhabitants` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`login_system`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`login_system` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(31) NOT NULL,
  `password` VARCHAR(31) NOT NULL,
  `user_type` TINYINT NOT NULL,
  `last_access` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

USE `roentgenium` ;

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`visitors_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`visitors_information` (`visitor_id` INT, `full_name` INT, `run` INT, `birth_date` INT, `last_visit` INT, `visit_type` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`currently_parked_vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`currently_parked_vehicles` (`visitor_id` INT, `full_name` INT, `license_plate` INT, `parked_at` INT, `parked_since` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`vehicle_owners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`vehicle_owners` (`visitor_id` INT, `full_name` INT, `registered_vehicles` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`unclaimed_correspondence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`unclaimed_correspondence` (`inhabitant_id` INT, `full_name` INT, `mail_type` INT, `arrival_time` INT, `is_claimed` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`inhabitants_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`inhabitants_information` (`inhabitant_id` INT, `full_name` INT, `run` INT, `apartment` INT, `housing_unit` INT, `contact_number` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`users_by_last_access`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`users_by_last_access` (`user_id` INT, `username` INT, `last_access` INT);

-- -----------------------------------------------------
-- procedure add_inhabitant
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_inhabitant`(IN aptmnt TINYINT, IN h_unit SMALLINT, IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN rolun INT, IN rolun_vd TINYINT(1), IN c_number VARCHAR(15))
BEGIN
	INSERT INTO inhabitants (apartment, housing_unit, first_name, last_name, run, run_vd, contact_number) VALUES (aptmnt, h_unit, f_name, l_name, rolun, rolun_vd, c_number);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_visitor`(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN rolun INT, IN rolun_vd TINYINT(1), IN b_date DATE, IN l_visit DATETIME, IN v_type VARCHAR(31))
BEGIN
	INSERT INTO visitors (first_name, last_name, run, run_vd, birth_date, last_visit, visit_type) VALUES (f_name, l_name, rolun, rolun_vd, b_date, l_visit, v_type);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visitor_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_visitor_vehicle`(IN v_id INT, IN l_plate VARCHAR(8), IN p_spot SMALLINT, IN p_date DATETIME)
BEGIN
	INSERT INTO vehicles_visitors (visitor_id, license_plate, parking_spot, parking_date) VALUES (v_id, l_plate, p_spot, p_date);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure search_visitor_name
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `search_visitor_name`(IN search_name VARCHAR(63))
BEGIN
    SELECT * FROM visitors WHERE CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', search_name, '%');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_mail`(IN i_id INT, IN m_type VARCHAR(31), IN a_time DATETIME, IN i_claimed TINYINT(1))
BEGIN
	INSERT INTO mail (inhabitant_id, mail_type, arrival_time, is_claimed) VALUES (i_id, m_type, a_time, i_claimed);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_visitor`(IN v_id INT)
BEGIN
	DELETE FROM visitors WHERE visitors.id = v_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_inhabitant
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_inhabitant` (IN i_id INT)
BEGIN
	DELETE FROM inhabitants WHERE inhabitants.id = i_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_vehicle` (IN l_plate VARCHAR(8))
BEGIN
	DELETE FROM vehicles_visitors WHERE license_plate = l_plate;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_user` (IN u_id INT)
BEGIN
	DELETE FROM login_system WHERE id = u_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure search_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `search_visitor`(IN search_name VARCHAR(63))
BEGIN
    SELECT * FROM visitors WHERE CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', search_name, '%');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure search_inhabitant
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `search_inhabitant` (IN search_name VARCHAR(63))
BEGIN
	SELECT * FROM inhabitants WHERE CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', search_name, '%');
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure change_claimed_status_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `change_claimed_status_mail` (IN m_id INT, IN new_claimed_status TINYINT)
BEGIN
	UPDATE mail SET is_claimed = new_claimed_status WHERE id = m_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_claimed_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_claimed_mail` (IN m_id INT, IN new_claimed_status TINYINT)
BEGIN
	IF new_claimed_status = 0 OR new_claimed_status = 1 THEN
		UPDATE mail SET is_claimed = new_claimed_status WHERE id = m_id;
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: The claimed status value must be 0 (not claimed) or 1 (claimed).';
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_claimed_stat_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_claimed_stat_mail` (IN m_id INT, IN new_claimed_status TINYINT)
BEGIN
	UPDATE mail SET is_claimed = new_claimed_status WHERE id = m_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_status_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_status_mail` (IN m_id INT, IN new_claimed_status TINYINT)
BEGIN
	UPDATE mail SET is_claimed = new_claimed_status WHERE id = m_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user_login
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_user_login` (IN u_id INT)
BEGIN
	DELETE FROM login_system WHERE id = u_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user_login_sys
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_user_login_sys` (IN u_id INT)
BEGIN
	DELETE FROM login_system WHERE id = u_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_inhabitant_phone_number
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_inhabitant_phone_number` (IN new_phone_number VARCHAR(15))
BEGIN
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_phone_number
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_phone_number` (IN i_id INT, IN new_phone_number VARCHAR(15))
BEGIN
	UPDATE inhabitants SET contact_number = new_phone_number WHERE id = i_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure free_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `free_parking_spot` (IN v_id INT)
BEGIN
	UPDATE vehicles_visitors SET parking_spot = NULL, parking_date = NULL WHERE id = v_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure assign_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `assign_parking_spot` (IN v_id INT, IN p_spot SMALLINT)
BEGIN
	UPDATE vehicles_visitors SET parking_spot = p_spot WHERE id = v_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_visitor_last_visit
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_visitor_last_visit` (IN v_id INT, IN l_visit VARCHAR(31))
BEGIN
	UPDATE visitors SET last_visit = l_visit WHERE id = v_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `roentgenium`.`visitors_information`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`visitors_information`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `visitors_information` AS
    SELECT 
        visitors.id AS visitor_id,
        CONCAT(visitors.first_name,
                ' ',
                visitors.last_name) AS full_name,
        CONCAT(visitors.run, '-', visitors.run_vd) AS run,
        visitors.birth_date,
        visitors.last_visit,
        visitors.visit_type
    FROM
        visitors;

-- -----------------------------------------------------
-- View `roentgenium`.`currently_parked_vehicles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`currently_parked_vehicles`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `currently_parked_vehicles` AS
    SELECT 
        visitors.id AS visitor_id,
        CONCAT(visitors.first_name,
                ' ',
                visitors.last_name) AS full_name,
        vehicles_visitors.license_plate,
        vehicles_visitors.parking_spot AS parked_at,
        vehicles_visitors.parking_date AS parked_since
    FROM
        visitors
            JOIN
        vehicles_visitors ON visitors.id = vehicles_visitors.visitor_ID
    WHERE
        vehicles_visitors.parking_spot IS NOT NULL;

-- -----------------------------------------------------
-- View `roentgenium`.`vehicle_owners`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`vehicle_owners`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `vehicle_owners` AS
    SELECT 
        visitors.id AS visitor_id,
        CONCAT(visitors.first_name,
                ' ',
                visitors.last_name) AS full_name,
        GROUP_CONCAT(vehicles_visitors.license_plate
            ORDER BY vehicles_visitors.id
            SEPARATOR ', ') AS registered_vehicles
    FROM
        visitors
            JOIN
        vehicles_visitors ON visitors.id = vehicles_visitors.visitor_ID
    GROUP BY visitors.id;

-- -----------------------------------------------------
-- View `roentgenium`.`unclaimed_correspondence`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`unclaimed_correspondence`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `unclaimed_correspondence` AS
    SELECT
        inhabitants.id AS inhabitant_id,
        CONCAT(inhabitants.first_name, ' ', inhabitants.last_name) AS full_name,
        mail.mail_type AS mail_type,
        mail.arrival_time,
        mail.is_claimed
    FROM
        inhabitants
    JOIN
        mail ON inhabitants.id = mail.inhabitant_id
    WHERE
        mail.is_claimed = 0;

-- -----------------------------------------------------
-- View `roentgenium`.`inhabitants_information`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`inhabitants_information`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `inhabitants_information` AS
    SELECT 
        inhabitants.id AS inhabitant_id,
        CONCAT(inhabitants.first_name,' ',inhabitants.last_name) AS full_name,
        CONCAT(inhabitants.run, '-', inhabitants.run_vd) AS run,
        CONCAT('Apartment ', inhabitants.apartment) AS apartment,
        CONCAT('Unit ', inhabitants.housing_unit) AS housing_unit,
        inhabitants.contact_number
    FROM
        inhabitants;

-- -----------------------------------------------------
-- View `roentgenium`.`users_by_last_access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`users_by_last_access`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `users_by_last_access` AS
    SELECT
		login_system.id AS user_id,
        login_system.username,
        login_system.last_access
    FROM
        login_system
	ORDER BY login_system.last_access DESC;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
