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
  `email` VARCHAR(63) NULL,
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
  `password_hashed` CHAR(64) NOT NULL,
  `salt` CHAR(32) NOT NULL,
  `user_type` TINYINT NOT NULL,
  `last_access` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
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
  UNIQUE INDEX `license_plate_UNIQUE` (`license_plate` ASC) VISIBLE,
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


-- -----------------------------------------------------
-- Table `roentgenium`.`visitors_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`visitors_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visitor_id` INT NOT NULL,
  `visit_date` DATETIME NOT NULL,
  `apartment_visited` TINYINT NOT NULL,
  `housing_unit_visited` SMALLINT NOT NULL,
  `visit_type` VARCHAR(31) NOT NULL,
  PRIMARY KEY (`id`, `visitor_id`),
  INDEX `fk_visitors_log_visitors1_idx` (`visitor_id` ASC) VISIBLE,
  CONSTRAINT `fk_visitors_log_visitors1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `roentgenium`.`visitors` (`id`)
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
CREATE TABLE IF NOT EXISTS `roentgenium`.`visitors_information` (`visitor_id` INT, `full_name` INT, `run` INT, `birth_date` INT, `visit_date` INT, `unit_apartment_visited` INT, `visit_type` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`inhabitants_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`inhabitants_information` (`visitor_id` INT, `full_name` INT, `run` INT, `unit_apartment` INT, `cellphone_number` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`unclaimed_correspondence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`unclaimed_correspondence` (`id` INT, `housing_unit_apartment` INT, `mail_type` INT, `arrival_time` INT, `is_notified` INT, `is_claimed` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`users_by_last_access`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`users_by_last_access` (`user_id` INT, `username` INT, `last_access` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`currently_parked_vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`currently_parked_vehicles` (`visitor_id` INT, `full_name` INT, `license_plate` INT, `parked_at` INT, `parked_since` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium`.`visitors_most_visits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`visitors_most_visits` (`visitor_id` INT, `full_name` INT, `total_visits_registered` INT);

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
CREATE PROCEDURE `add_visitor`(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN rolun INT, IN rolun_vd TINYINT(1), IN b_date DATE, IN apt_visited TINYINT, IN hu_visited SMALLINT, IN v_type VARCHAR(31))
BEGIN
    DECLARE visitor_specific_id INT;

    -- Verify if visitor exists into the table
    SELECT id INTO visitor_specific_id FROM visitors WHERE first_name = f_name AND last_name = l_name AND run = rolun;

    -- Visitor exists; update the log
    IF visitor_specific_id IS NOT NULL THEN
        INSERT INTO visitors_log (visitor_id, visit_date, apartment_visited, housing_unit_visited, visit_type) VALUES (visitor_specific_id, NOW(), apt_visited, hu_visited, v_type);
        
    -- Visitor does not exist in the table; add it
    ELSE
        INSERT INTO visitors (first_name, last_name, run, run_vd, birth_date) VALUES (f_name, l_name, rolun, rolun_vd, b_date);
        INSERT INTO visitors_log (visitor_id, visit_date, apartment_visited, housing_unit_visited, visit_type) VALUES (LAST_INSERT_ID(), NOW(), apt_visited, hu_visited, v_type);
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visitor_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_visitor_vehicle` (IN v_id INT, IN l_plate VARCHAR(8))
BEGIN
	INSERT INTO vehicles_visitors (visitor_id, license_plate) VALUES (v_id, l_plate);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_user_login
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `add_user_login` (IN usrnm VARCHAR(31), IN psswrd CHAR(64), IN slt CHAR(32), IN u_type TINYINT)
BEGIN
	INSERT INTO login_system (username, password_hashed, salt, user_type, last_access) VALUES (usrnm, psswrd, slt, u_type, NOW());
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure assign_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `assign_parking_spot` (IN l_plate VARCHAR(8), IN p_spot SMALLINT)
BEGIN
	UPDATE vehicles_visitors SET parking_spot = p_spot, parking_date = NOW() WHERE (license_plate = l_plate AND p_spot BETWEEN 1 AND 8);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `delete_vehicle` (IN l_plate VARCHAR(8))
BEGIN
	DELETE FROM vehicles_visitors WHERE (license_plate = l_plate AND id > 0);
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
-- procedure search_visitor_run
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE PROCEDURE `search_visitor_run`(IN search_run INT)
BEGIN
    SELECT * FROM visitors WHERE run = search_run;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function calculate_age_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE FUNCTION calculate_age_visitor(person_id INT) RETURNS INT
BEGIN
    DECLARE dob DATE;
    SELECT birth_date INTO dob FROM visitors WHERE id = person_id;
    RETURN YEAR(CURDATE()) - YEAR(dob) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(dob, '%m%d'));
END;$$

DELIMITER ;

-- -----------------------------------------------------
-- function count_unclaimed_mails_by_unit_apartment
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium`$$
CREATE FUNCTION count_unclaimed_mails_by_unit_apartment(housing_unit_id INT, apartment_id INT) RETURNS INT
BEGIN
    DECLARE unclaimed_count INT;
    SELECT COUNT(*) INTO unclaimed_count FROM mail WHERE is_claimed = 0 AND housing_unit_recipient = housing_unit_id AND apartment_recipient = apartment_id;
    RETURN unclaimed_count;
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
        v.id AS visitor_id,
        CONCAT(v.first_name, ' ', v.last_name) AS full_name,
        CONCAT(v.run, '-', v.run_vd) AS run,
        v.birth_date,
        vl.visit_date,
        CONCAT(vl.housing_unit_visited, '-', vl.apartment_visited) AS unit_apartment_visited,
        vl.visit_type
    FROM
        visitors v
    LEFT JOIN
        visitors_log vl ON v.id = vl.visitor_id
	ORDER BY
		vl.visit_date DESC;

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

-- -----------------------------------------------------
-- View `roentgenium`.`users_by_last_access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`users_by_last_access`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `users_by_last_access` AS
    SELECT
		id AS user_id,
        username,
        last_access
    FROM
        login_system
	ORDER BY last_access DESC;

-- -----------------------------------------------------
-- View `roentgenium`.`currently_parked_vehicles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`currently_parked_vehicles`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `currently_parked_vehicles` AS
    SELECT 
        visitors.id AS visitor_id,
        CONCAT(visitors.first_name, ' ', visitors.last_name) AS full_name,
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
-- View `roentgenium`.`visitors_most_visits`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium`.`visitors_most_visits`;
USE `roentgenium`;
CREATE  OR REPLACE VIEW `visitors_most_visits` AS
SELECT
    v.id AS visitor_id,
    CONCAT(v.first_name, ' ', v.last_name) AS full_name,
    COUNT(vl.id) AS total_visits_registered
FROM
    visitors v
LEFT JOIN
    visitors_log vl ON v.id = vl.visitor_id
GROUP BY
    v.id, full_name;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
