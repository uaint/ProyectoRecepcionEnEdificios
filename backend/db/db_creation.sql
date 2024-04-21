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
CREATE SCHEMA IF NOT EXISTS `roentgenium` DEFAULT CHARACTER SET utf8mb3 ;
USE `roentgenium` ;

-- -----------------------------------------------------
-- Table `roentgenium`.`inhabitants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`inhabitants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apartment` TINYINT NOT NULL,
  `housing_unit` SMALLINT NOT NULL,
  `first_name` VARCHAR(31) NOT NULL,
  `last_name` VARCHAR(31) NOT NULL,
  `run` INT NOT NULL,
  `run_vd` TINYINT(1) NOT NULL,
  `contact_number` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `run_UNIQUE` (`run` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `roentgenium`.`login_system`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`login_system` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(31) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `user_type` TINYINT NOT NULL,
  `last_access` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
  `last_visit` DATETIME NOT NULL,
  `apartment_visited` TINYINT NOT NULL,
  `housing_unit_visited` SMALLINT NOT NULL,
  `visit_type` VARCHAR(31) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `run_UNIQUE` (`run` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `roentgenium`.`vehicles_visitors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`vehicles_visitors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visitor_id` INT NOT NULL,
  `license_plate` VARCHAR(8) NOT NULL,
  `parking_spot` SMALLINT NULL DEFAULT NULL,
  `parking_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `visitor_id`),
  UNIQUE INDEX `parking_spot_UNIQUE` (`parking_spot` ASC) VISIBLE,
  INDEX `fk_vehicle_registry_visitors_visitors1_idx` (`visitor_id` ASC) VISIBLE,
  CONSTRAINT `fk_vehicle_registry_visitors_visitors1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `roentgenium`.`visitors` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `roentgenium`.`mail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`mail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mail_type` VARCHAR(31) NOT NULL,
  `arrival_time` DATETIME NOT NULL,
  `apartment_recipient` TINYINT NOT NULL,
  `housing_unit_recipient` SMALLINT NOT NULL,
  `is_notified` TINYINT(1) NOT NULL,
  `is_claimed` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mail_inhabitants1_idx` (`housing_unit_recipient` ASC) VISIBLE,
  INDEX `fk_mail_inhabitants2_idx` (`apartment_recipient` ASC) VISIBLE,
  CONSTRAINT `fk_mail_inhabitants1`
    FOREIGN KEY (`housing_unit_recipient`)
    REFERENCES `roentgenium`.`inhabitants` (`housing_unit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mail_inhabitants2`
    FOREIGN KEY (`apartment_recipient`)
    REFERENCES `roentgenium`.`inhabitants` (`apartment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `roentgenium` ;

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`vehicle_owners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`vehicle_owners` (`visitor_id` INT, `full_name` INT, `registered_vehicles` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`visitors_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`visitors_information` (`visitor_id` INT, `full_name` INT, `run` INT, `birth_date` INT, `last_visit` INT, `unit_apartment_visited` INT, `visit_type` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`inhabitants_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`inhabitants_information` (`visitor_id` INT, `full_name` INT, `run` INT, `unit_apartment` INT, `cellphone_number` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`unclaimed_correspondence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`unclaimed_correspondence` (`id` INT, `housing_unit_apartment` INT, `mail_type` INT, `arrival_time` INT, `is_notified` INT, `is_claimed` INT);

-- -----------------------------------------------------
-- procedure add_inhabitant
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_inhabitant`(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN aptmnt TINYINT, IN h_unit SMALLINT, IN rolun INT, IN rolun_vd TINYINT(1), IN c_number VARCHAR(15))
BEGIN
	INSERT INTO inhabitants (apartment, housing_unit, first_name, last_name, run, run_vd, contact_number) VALUES (aptmnt, h_unit, f_name, l_name, rolun, rolun_vd, c_number);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_mail`(IN apt_recipient TINYINT, IN hu_recipient SMALLINT, IN m_type VARCHAR(31), IN a_time DATETIME, IN i_notified TINYINT)
BEGIN
	INSERT INTO mail (mail_type, arrival_time, apartment_recipient, housing_unit_recipient, is_notified, is_claimed) VALUES (m_type, a_time, apt_recipient, hu_recipient, i_notified, 0);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_visitor`(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN rolun INT, IN rolun_vd TINYINT(1), IN b_date DATE, IN l_visit DATETIME, IN apt_visited TINYINT, IN hu_visited SMALLINT, IN v_type VARCHAR(31))
BEGIN
    DECLARE visitor_id INT;

    -- Verify if visitor exists into the table
    SELECT id INTO visitor_id FROM visitors WHERE first_name = f_name AND last_name = l_name AND run = rolun;

    -- Visitor exists; update just last_visit
    IF visitor_id IS NOT NULL THEN
        UPDATE visitors SET last_visit = l_visit WHERE id = visitor_id;
    ELSE
        -- Visitor does not exist in the table; add it
        INSERT INTO visitors (first_name, last_name, run, run_vd, birth_date, last_visit, apartment_visited, housing_unit_visited, visit_type)
        VALUES (f_name, l_name, rolun, rolun_vd, b_date, l_visit, apt_visited, hu_visited, v_type);
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visitor_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_visitor_vehicle` (IN v_id INT, IN l_plate VARCHAR(8), IN p_spot SMALLINT, IN p_date DATETIME)
BEGIN
	INSERT INTO vehicles_visitors (visitor_id, license_plate, parking_spot, parking_date) VALUES (v_id, l_plate, p_spot, p_date);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_user_login
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_user_login` (IN usrnm VARCHAR(31), IN psswrd VARCHAR(256), IN u_type TINYINT)
BEGIN
	INSERT INTO login_system (username, password, user_type, last_access) VALUES (usrnm, psswrd, u_type, NOW());
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure assign_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `assign_parking_spot` (IN l_plate VARCHAR(8), IN p_spot SMALLINT)
BEGIN
	UPDATE vehicles_visitors SET parking_spot = p_spot WHERE license_plate = l_plate;
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
-- procedure free_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `free_parking_spot` (IN l_plate VARCHAR(8))
BEGIN
	UPDATE vehicles_visitors SET parking_spot = NULL, parking_date = NULL WHERE license_plate = l_plate;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_mail_to_claimed
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `update_mail_to_claimed` (IN m_id INT)
BEGIN
	UPDATE mail SET is_claimed = 1 WHERE id = m_id;
END$$

DELIMITER ;

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
            ORDER BY vehicles_visitors.id ASC
            SEPARATOR ', ') AS registered_vehicles
    FROM
        (visitors
        JOIN vehicles_visitors ON (visitors.id = vehicles_visitors.visitor_id))
    GROUP BY visitors.id;

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
        CONCAT(visitors.run,
                '-',
                visitors.run_vd) AS run,
        visitors.birth_date AS birth_date,
        visitors.last_visit AS last_visit,
        CONCAT(visitors.housing_unit_visited,
                '-',
                visitors.apartment_visited) AS unit_apartment_visited,
        visitors.visit_type AS visit_type
    FROM
        visitors;

-- -----------------------------------------------------
-- View `roentgenium`.`inhabitants_information`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`inhabitants_information`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `inhabitants_information` AS
    SELECT 
        id AS visitor_id,
        CONCAT(first_name,
                ' ',
                last_name) AS full_name,
        CONCAT(run,
                '-',
                run_vd) AS run,
        CONCAT(housing_unit,
                '-',
                apartment) AS unit_apartment,
        contact_number AS cellphone_number
    FROM
        inhabitants;

-- -----------------------------------------------------
-- View `roentgenium`.`unclaimed_correspondence`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`unclaimed_correspondence`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `unclaimed_correspondence` AS
    SELECT 
		id,
        CONCAT(housing_unit_recipient, '-', apartment_recipient) AS housing_unit_apartment,
        mail_type,
        arrival_time,
        is_notified,
        is_claimed
    FROM
        mail
    WHERE
        mail.is_claimed = 0;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
