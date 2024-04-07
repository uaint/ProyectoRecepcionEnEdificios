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
  `type` VARCHAR(31) NOT NULL,
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
  `user_type` VARCHAR(31) NOT NULL,
  `last_access` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
