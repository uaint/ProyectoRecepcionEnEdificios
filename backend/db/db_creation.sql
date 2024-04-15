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
