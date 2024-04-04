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
-- Table `roentgenium`.`Visitors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`Visitors` (
  `visitor_ID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(31) NOT NULL,
  `LastName` VARCHAR(31) NOT NULL,
  `Run` INT NOT NULL,
  `RunVd` TINYINT(1) NOT NULL,
  `BirthDate` DATE NOT NULL,
  `VisitAmmount` INT NOT NULL,
  `VisitType` VARCHAR(31) NOT NULL,
  PRIMARY KEY (`visitor_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`Vehicle_Registry_Visitors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`Vehicle_Registry_Visitors` (
  `visitor_vehicle_ID` INT NOT NULL AUTO_INCREMENT,
  `Visitors_visitor_ID` INT NOT NULL,
  `LicensePlate` VARCHAR(8) NOT NULL,
  `ParkingSpot` SMALLINT NULL,
  `ParkingDate` DATETIME NULL,
  PRIMARY KEY (`visitor_vehicle_ID`, `Visitors_visitor_ID`),
  INDEX `fk_Vehicle_Registry_Visitors_Visitors_idx` (`Visitors_visitor_ID` ASC),
  CONSTRAINT `fk_Vehicle_Registry_Visitors_Visitors`
    FOREIGN KEY (`Visitors_visitor_ID`)
    REFERENCES `roentgenium`.`Visitors` (`visitor_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`Inhabitants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`Inhabitants` (
  `inhabitant_ID` INT NOT NULL AUTO_INCREMENT,
  `Tower` TINYINT NOT NULL,
  `Unit` SMALLINT NOT NULL,
  `FirstName` VARCHAR(31) NOT NULL,
  `LastName` VARCHAR(31) NOT NULL,
  `Run` INT NOT NULL,
  `RunVd` TINYINT(1) NOT NULL,
  `ContactNumber` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`inhabitant_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`Incoming_Mail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`Incoming_Mail` (
  `mail_ID` INT NOT NULL AUTO_INCREMENT,
  `Inhabitants_inhabitant_ID` INT NOT NULL,
  `Type` VARCHAR(31) NOT NULL,
  `TimeArrival` DATETIME NOT NULL,
  `IsClaimed` TINYINT(1) NOT NULL,
  PRIMARY KEY (`mail_ID`, `Inhabitants_inhabitant_ID`),
  INDEX `fk_Incoming_Mail_Inhabitants1_idx` (`Inhabitants_inhabitant_ID` ASC),
  CONSTRAINT `fk_Incoming_Mail_Inhabitants1`
    FOREIGN KEY (`Inhabitants_inhabitant_ID`)
    REFERENCES `roentgenium`.`Inhabitants` (`inhabitant_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium`.`Login_Sys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium`.`Login_Sys` (
  `login_ID` INT NOT NULL,
  `Username` VARCHAR(31) NOT NULL,
  `Password` VARCHAR(31) NOT NULL,
  PRIMARY KEY (`login_ID`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;