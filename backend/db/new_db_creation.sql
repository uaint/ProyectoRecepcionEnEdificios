-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema roentgenium_new_eer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema roentgenium_new_eer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `roentgenium_new_eer` DEFAULT CHARACTER SET utf8 ;
USE `roentgenium_new_eer` ;

-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`person` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(31) NOT NULL,
  `last_name` VARCHAR(31) NOT NULL,
  `run` INT NOT NULL,
  `run_vd` TINYINT(1) NOT NULL,
  `birth_date` DATE NULL,
  `contact_phone_number` VARCHAR(15) NULL,
  `contact_email` VARCHAR(127) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `run_UNIQUE` (`run` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`tower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`tower` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `located_at` VARCHAR(127) NOT NULL,
  `name_identifier` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`apartment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`apartment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tower_id` INT NOT NULL,
  `number_identifier` SMALLINT NOT NULL,
  `floor` TINYINT NOT NULL,
  PRIMARY KEY (`id`, `tower_id`),
  INDEX `fk_apartment_tower_idx` (`tower_id` ASC) VISIBLE,
  CONSTRAINT `fk_apartment_tower`
    FOREIGN KEY (`tower_id`)
    REFERENCES `roentgenium_new_eer`.`tower` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`inhabitant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`inhabitant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apartment_id` INT NOT NULL,
  `person_id` INT NOT NULL,
  PRIMARY KEY (`id`, `apartment_id`, `person_id`),
  INDEX `fk_inhabitant_apartment1_idx` (`apartment_id` ASC) VISIBLE,
  INDEX `fk_inhabitant_person1_idx` (`person_id` ASC) VISIBLE,
  CONSTRAINT `fk_inhabitant_apartment1`
    FOREIGN KEY (`apartment_id`)
    REFERENCES `roentgenium_new_eer`.`apartment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inhabitant_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `roentgenium_new_eer`.`person` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`visitor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`visitor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id`),
  INDEX `fk_visitor_person1_idx` (`person_id` ASC) VISIBLE,
  CONSTRAINT `fk_visitor_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `roentgenium_new_eer`.`person` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`mail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`mail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apartment_id` INT NOT NULL,
  `arrival_time` DATETIME NOT NULL,
  `mail_type` VARCHAR(31) NOT NULL,
  `is_notified` TINYINT(1) NOT NULL,
  `is_claimed` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`, `apartment_id`),
  INDEX `fk_mail_apartment1_idx` (`apartment_id` ASC) VISIBLE,
  CONSTRAINT `fk_mail_apartment1`
    FOREIGN KEY (`apartment_id`)
    REFERENCES `roentgenium_new_eer`.`apartment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`visitor_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`visitor_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visitor_id` INT NOT NULL,
  `apartment_id` INT NOT NULL,
  `visit_date` DATETIME NOT NULL,
  `visit_type` VARCHAR(31) NOT NULL,
  PRIMARY KEY (`id`, `visitor_id`, `apartment_id`),
  INDEX `fk_visitor_log_visitor1_idx` (`visitor_id` ASC) VISIBLE,
  INDEX `fk_visitor_log_apartment1_idx` (`apartment_id` ASC) VISIBLE,
  CONSTRAINT `fk_visitor_log_visitor1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `roentgenium_new_eer`.`visitor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_visitor_log_apartment1`
    FOREIGN KEY (`apartment_id`)
    REFERENCES `roentgenium_new_eer`.`apartment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`vehicle_visitors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`vehicle_visitors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visitor_id` INT NOT NULL,
  `license_plate` VARCHAR(8) NOT NULL,
  `parking_spot` TINYINT NULL,
  `parking_date` DATETIME NULL,
  PRIMARY KEY (`id`, `visitor_id`),
  INDEX `fk_vehicles_visitors_visitor1_idx` (`visitor_id` ASC) VISIBLE,
  CONSTRAINT `fk_vehicles_visitors_visitor1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `roentgenium_new_eer`.`visitor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`login_sys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`login_sys` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person_id` INT NOT NULL,
  `apartment_id_associated` INT NULL,
  `tower_id_associated` INT NULL,
  `username` VARCHAR(127) NOT NULL,
  `password_hashed` CHAR(64) NOT NULL,
  `password_salt` CHAR(32) NOT NULL,
  `user_role` TINYINT NOT NULL,
  `last_access` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `person_id`),
  INDEX `fk_login_sys_person1_idx` (`person_id` ASC) VISIBLE,
  CONSTRAINT `fk_login_sys_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `roentgenium_new_eer`.`person` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`frequent_visitor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`frequent_visitor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visitor_id` INT NOT NULL,
  `apartment_id` INT NOT NULL,
  PRIMARY KEY (`id`, `visitor_id`, `apartment_id`),
  INDEX `fk_table1_visitor1_idx` (`visitor_id` ASC) VISIBLE,
  INDEX `fk_table1_apartment1_idx` (`apartment_id` ASC) VISIBLE,
  UNIQUE INDEX `visitor_id_UNIQUE` (`visitor_id` ASC) VISIBLE,
  CONSTRAINT `fk_table1_visitor1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `roentgenium_new_eer`.`visitor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_apartment1`
    FOREIGN KEY (`apartment_id`)
    REFERENCES `roentgenium_new_eer`.`apartment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `log_level` VARCHAR(10) NOT NULL,
  `log_message` TEXT NOT NULL,
  `log_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `context` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roentgenium_new_eer`.`messaging`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`messaging` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `tower_id` INT NOT NULL,
  `message` VARCHAR(512) NOT NULL,
  `message_timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `sender_id`, `tower_id`),
  INDEX `fk_messaging_person1_idx` (`sender_id` ASC) VISIBLE,
  INDEX `fk_messaging_tower1_idx` (`tower_id` ASC) VISIBLE,
  CONSTRAINT `fk_messaging_person1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `roentgenium_new_eer`.`person` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messaging_tower1`
    FOREIGN KEY (`tower_id`)
    REFERENCES `roentgenium_new_eer`.`tower` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `roentgenium_new_eer` ;

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium_new_eer`.`visitors_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`visitors_information` (`visitor_id` INT, `log_id` INT, `full_name` INT, `run` INT, `birth_date` INT, `apartment_identifier` INT, `tower` INT, `is_frequent_visitor` INT, `visit_motive` INT, `visit_date` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium_new_eer`.`unclaimed_correspondence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`unclaimed_correspondence` (`id` INT, `apartment_identifier` INT, `tower` INT, `mail_type` INT, `arrival_time` INT, `is_notified` INT, `is_claimed` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium_new_eer`.`currently_parked_vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`currently_parked_vehicles` (`visitor_id` INT, `full_name` INT, `license_plate` INT, `parked_at` INT, `parked_since` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium_new_eer`.`all_correspondence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`all_correspondence` (`id` INT, `apartment_identifier` INT, `tower` INT, `mail_type` INT, `arrival_time` INT, `is_notified` INT, `is_claimed` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium_new_eer`.`all_vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`all_vehicles` (`visitor_id` INT, `full_name` INT, `license_plates` INT);

-- -----------------------------------------------------
-- Placeholder table for view `roentgenium_new_eer`.`message_view`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roentgenium_new_eer`.`message_view` (`message_id` INT, `sender_id` INT, `sender_full_name` INT, `message` INT, `sent_at` INT, `apartment_number` INT, `tower_number` INT);

-- -----------------------------------------------------
-- procedure add_inhabitant
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_inhabitant(IN p_id INT, IN apt_id INT)
BEGIN
	INSERT INTO inhabitant (person_id, apartment_id) VALUES (p_id, apt_id);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_mail
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_mail(IN m_type VARCHAR(31), IN a_time DATETIME, IN tower_id INT, IN number_identifier INT, IN i_notified TINYINT)
BEGIN
    DECLARE apt_id INT;
    
    SET apt_id = obtain_apartment_id(tower_id, number_identifier);
    
    INSERT INTO mail (mail_type, arrival_time, apartment_id, is_notified, is_claimed) 
    VALUES (m_type, a_time, apt_id, i_notified, 0);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_user_login
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_user_login(IN p_id INT, IN apt_id INT, IN t_id INT, IN usrnm VARCHAR(127), IN pass_hash CHAR(64), IN pass_salt CHAR(32), IN u_role TINYINT)
BEGIN
	INSERT INTO login_sys (person_id, apartment_id_associated, tower_id_associated, username, password_hashed, password_salt, user_role, last_access) VALUES (p_id, apt_id, t_id, usrnnm, pass_hash, pass_salt, u_role, NOW());
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visitor_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_visitor_vehicle(IN v_id INT, IN l_plate VARCHAR(8))
BEGIN
	INSERT INTO vehicle_visitors (visitor_id, license_plate) VALUES (v_id, l_plate);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure assign_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE assign_parking_spot(IN l_plate VARCHAR(8), IN p_spot SMALLINT)
BEGIN
	UPDATE vehicle_visitors SET parking_spot = p_spot, parking_date = NOW() WHERE (license_plate = l_plate AND (p_spot BETWEEN 1 AND 8) AND id > 0);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure free_parking_spot
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE free_parking_spot(IN l_plate VARCHAR(8))
BEGIN
	UPDATE vehicle_visitors SET parking_spot = NULL, parking_date = NULL WHERE license_plate = l_plate AND id > 0;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_vehicle
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE delete_vehicle(IN l_plate VARCHAR(8))
BEGIN
	DELETE FROM vehicle_visitors WHERE (license_plate = l_plate AND id > 0);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_mail_to_claimed
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE update_mail_to_claimed(IN m_id INT)
BEGIN
	UPDATE mail SET is_claimed = 1 WHERE id = m_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_frequent_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_frequent_visitor(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN r_num INT, IN r_vd TINYINT(1), IN b_date DATE, IN apartment_number INT, IN tower_number INT)
BEGIN
	DECLARE p_id INT;
    DECLARE v_id INT;
    DECLARE a_id INT;
    
    SET a_id = obtain_apartment_id(tower_number, apartment_number);
    SET p_id = obtain_person_id_by_run(r_num);
    SET v_id = obtain_visitor_id_by_run(r_num);
    
    -- Best case scenario: Person does exist
    IF p_id IS NOT NULL THEN
		IF v_id IS NOT NULL THEN
			INSERT INTO frequent_visitor (visitor_id, apartment_id) VALUES (v_id, a_id);
		ELSE
			INSERT INTO visitor (person_id) VALUES (p_id);
            SET v_id = obtain_visitor_id_by_run(r_num);
            INSERT INTO frequent_visitor (visitor_id, apartment_id) VALUES (v_id, a_id);
		END IF;
			
    -- Worst case scenario: Person does not exist (therefore, neither does the visitor and frequent visitor instances)
    ELSE
		CALL add_person(f_name, l_name, r_num, r_vd, b_date, NULL, NULL);
        SET p_id = obtain_person_id_by_run(r_num);
		INSERT INTO visitor (person_id) VALUES (p_id);
        SET v_id = obtain_visitor_id_by_run(r_num);
		INSERT INTO frequent_visitor (visitor_id, apartment_id) VALUES (v_id, a_id);
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_tower
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_tower(IN tower_address VARCHAR(127), IN tower_name VARCHAR(45))
BEGIN
	INSERT INTO tower (located_at, name_identifier) VALUES (tower_address, tower_name);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_apartment
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_apartment(IN t_id INT, IN n_identifier SMALLINT, IN tower_floor_located_at TINYINT)
BEGIN
	INSERT INTO apartment (tower_id, number_identifier, floor) VALUES (t_id, n_identifier, tower_floor_located_at);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE delete_visitor(IN v_id INT)
BEGIN
	DECLARE p_id INT;
	DELETE FROM visitor_log WHERE visitor_id = v_id;
	DELETE FROM vehicle_visitors WHERE visitor_id = v_id;
    DELETE FROM frequent_visitor WHERE visitor_id = v_id;
    SELECT person_id INTO p_id FROM visitor WHERE id = v_id;
    DELETE FROM visitor WHERE id = v_id;
    DELETE FROM person WHERE id = p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_person
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_person(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN r_num INT, IN r_vd TINYINT(1), IN b_date DATE, IN phone_num VARCHAR(15), IN email VARCHAR(127))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Log the error
        CALL log_error('An error occured trying to add a new person: The RUN is already in our records.', 'add_person');
    END;

    START TRANSACTION;

    -- Try to insert the new person
    CALL log_debug(CONCAT('Adding new person: ', f_name, ' ', l_name, ', RUN: ', r_num, '-', r_vd), 'add_person');
    INSERT INTO person (
        first_name, last_name, run, run_vd, birth_date, contact_phone_number, contact_email
    ) VALUES (
        f_name, l_name, r_num, r_vd, b_date, phone_num, email
    );

    -- Log the success of the insertion
    CALL log_info(CONCAT('Successfully added a new person: ', f_name, ' ', l_name, ', RUN: ', r_num, '-', r_vd), 'add_person');

    COMMIT;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function obtain_person_id_by_run
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE FUNCTION obtain_person_id_by_run(run_search INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE person_id INT;
    
    SELECT id INTO person_id FROM person WHERE run = run_search;
    
    RETURN person_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function obtain_visitor_id_by_run
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE FUNCTION obtain_visitor_id_by_run(run_search INT) RETURNS INT DETERMINISTIC
BEGIN
	DECLARE original_person_id INT;
    DECLARE visitor_id INT;
    
    SELECT id INTO original_person_id FROM person WHERE run = run_search;
    SELECT id INTO visitor_id FROM visitor WHERE person_id = original_person_id;
    
    RETURN visitor_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtain_inhabitants_by_apartment
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE obtain_inhabitants_by_apartment(IN tower_id INT, IN number_identifier INT)
BEGIN
    SELECT 
        p.id AS person_id,
        i.id AS inhabitant_id,
        p.first_name,
        p.last_name,
        p.run,
        p.run_vd,
        p.birth_date,
        p.contact_phone_number,
        p.contact_email
    FROM 
        apartment a
        INNER JOIN inhabitant i ON a.id = i.apartment_id
        INNER JOIN person p ON i.person_id = p.id
    WHERE 
        a.tower_id = tower_id
        AND a.number_identifier = number_identifier;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function obtain_apartment_id
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE FUNCTION obtain_apartment_id(t_id INT, num_identifier INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE apartment_id INT;
    
    SELECT id INTO apartment_id 
    FROM apartment 
    WHERE tower_id = t_id AND number_identifier = num_identifier;
    
    RETURN apartment_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_new_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_new_visitor(IN p_id INT)
BEGIN
	INSERT INTO visitor (person_id) VALUES (p_id);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_visit_from_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE add_visit_from_visitor(IN v_id INT, IN apt_id INT, IN v_type VARCHAR(31))
BEGIN
	INSERT INTO visitor_log (visitor_id, apartment_id, visit_date, visit_type) VALUES (v_id, apt_id, NOW(), v_type);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_and_add_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE check_and_add_visitor(
    IN run_search INT
)
BEGIN
    DECLARE v_id INT;
    DECLARE apt_id INT;

    -- Obtener el ID de la persona usando su RUT
    SET v_id = obtain_visitor_id_by_run(run_search);
    
    -- Verificar si el visitor_id existe en la tabla frequent_visitor
    IF v_id IS NOT NULL THEN
		SELECT apartment_id INTO apt_id
		FROM frequent_visitor
		WHERE visitor_id = v_id;
        IF apt_id IS NOT NULL THEN
			CALL add_visit_from_visitor(v_id, apt_id, "Frequent");
		END IF;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_and_add_non_frequent_visitor
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE check_and_add_non_frequent_visitor(IN f_name VARCHAR(31), IN l_name VARCHAR(31), IN run_visitor INT, IN run_visitor_dv TINYINT, IN b_date DATE, IN tower_visited INT,
IN apt_into_tower_visited INT, IN v_type VARCHAR(31))
BEGIN
	DECLARE p_id INT;
    DECLARE v_id INT;
    DECLARE apt_id INT;
    SET p_id = obtain_person_id_by_run(run_visitor);
    SET v_id = obtain_visitor_id_by_run(run_visitor);
    SET apt_id = obtain_apartment_id(tower_visited, apt_into_tower_visited);
    
    -- Best Case Scenario: Person ID exists
    IF p_id IS NOT NULL THEN
		-- Case 1: Visitor ID exists
		IF v_id IS NOT NULL THEN
			CALL add_visit_from_visitor(v_id, apt_id, v_type);
		-- Case 2: Person exists, but is not registered as a Visitor
		ELSE
			CALL add_new_visitor(p_id);
            SET v_id = obtain_visitor_id_by_run(run_visitor);
            CALL add_visit_from_visitor(v_id, apt_id, v_type);
		END IF;
        
	-- Worst Case Scenario: Person ID does not exists (and because of that, neither does Visitor ID)
    ELSE
		CALL add_person(f_name, l_name, run_visitor, run_visitor_dv, b_date, NULL, NULL);
		SET p_id = obtain_person_id_by_run(run_visitor);
        CALL add_new_visitor(p_id);
        SET v_id = obtain_visitor_id_by_run(run_visitor);
        CALL add_visit_from_visitor(v_id, apt_id, v_type);
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure log_info
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE `log_info`(IN p_message TEXT, IN p_context VARCHAR(255))
BEGIN
    INSERT INTO `logs` (`log_level`, `log_message`, `context`) VALUES ('INFO', p_message, p_context);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure log_error
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE `log_error`(IN p_message TEXT, IN p_context VARCHAR(255))
BEGIN
    INSERT INTO `logs` (`log_level`, `log_message`, `context`) VALUES ('ERROR', p_message, p_context);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure log_debug
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE `log_debug`(IN p_message TEXT, IN p_context VARCHAR(255))
BEGIN
    INSERT INTO `logs` (`log_level`, `log_message`, `context`) VALUES ('DEBUG', p_message, p_context);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_visitors_info
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE get_visitors_info(IN tower_param VARCHAR(255), IN apartment_identifier_param VARCHAR(255))
BEGIN
    IF (tower_param IS NULL OR tower_param = 'null') AND (apartment_identifier_param IS NULL OR apartment_identifier_param = 'null') THEN
        SELECT * FROM visitors_information;
    ELSEIF tower_param IS NOT NULL AND (apartment_identifier_param IS NULL OR apartment_identifier_param =  'null') THEN
        SELECT * FROM visitors_information WHERE tower = tower_param;
    ELSEIF tower_param IS NOT NULL AND apartment_identifier_param IS NOT NULL THEN
        SELECT * FROM visitors_information WHERE tower = tower_param AND apartment_identifier = apartment_identifier_param;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_unclaimed_mail_info
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE get_unclaimed_mail_info(IN tower_param VARCHAR(255), IN apartment_identifier_param VARCHAR(255))
BEGIN
    IF (tower_param IS NULL OR tower_param = 'null') AND (apartment_identifier_param IS NULL OR apartment_identifier_param = 'null') THEN
        SELECT * FROM unclaimed_correspondence;
    ELSEIF tower_param IS NOT NULL AND (apartment_identifier_param IS NULL OR apartment_identifier_param =  'null') THEN
        SELECT * FROM unclaimed_correspondence WHERE tower = tower_param;
    ELSEIF tower_param IS NOT NULL AND apartment_identifier_param IS NOT NULL THEN
        SELECT * FROM unclaimed_correspondence WHERE tower = tower_param AND apartment_identifier = apartment_identifier_param;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_all_mail_info
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE get_all_mail_info(IN tower_param VARCHAR(255), IN apartment_identifier_param VARCHAR(255))
BEGIN
    IF (tower_param IS NULL OR tower_param = 'null') AND (apartment_identifier_param IS NULL OR apartment_identifier_param = 'null') THEN
        SELECT * FROM all_correspondence;
    ELSEIF tower_param IS NOT NULL AND (apartment_identifier_param IS NULL OR apartment_identifier_param =  'null') THEN
        SELECT * FROM all_correspondence WHERE tower = tower_param;
    ELSEIF tower_param IS NOT NULL AND apartment_identifier_param IS NOT NULL THEN
        SELECT * FROM all_correspondence WHERE tower = tower_param AND apartment_identifier = apartment_identifier_param;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure send_message
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE send_message(IN s_id INT, IN t_id INT, IN message_to_send VARCHAR(256))
BEGIN
	INSERT INTO messaging (sender_id, tower_id, message) VALUES (s_id, t_id, message_to_send);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_messages
-- -----------------------------------------------------

DELIMITER $$
USE `roentgenium_new_eer`$$
CREATE PROCEDURE get_messages(IN tower_param VARCHAR(4))
BEGIN
    IF (tower_param IS NULL OR tower_param = 'null') THEN
        SELECT * FROM message_view;
    ELSE
		SELECT * FROM message_view WHERE tower_number = tower_param;
    END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- View `roentgenium_new_eer`.`visitors_information`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium_new_eer`.`visitors_information`;
USE `roentgenium_new_eer`;
CREATE  OR REPLACE VIEW `visitors_information` AS
    SELECT 
        v.id AS visitor_id,
        vl.id AS log_id,
        CONCAT(p.first_name, ' ', p.last_name) AS full_name,
        CONCAT(p.run, '-', p.run_vd) AS run,
        p.birth_date,
        apt.number_identifier AS apartment_identifier,
        apt.tower_id AS tower,
        IF(fv.id IS NOT NULL, 1, 0) AS is_frequent_visitor,
        vl.visit_type AS visit_motive,
        vl.visit_date
    FROM
        visitor v
	LEFT JOIN
		person p ON v.person_id = p.id
	LEFT JOIN
		visitor_log vl ON v.id = vl.visitor_id
	LEFT JOIN
		frequent_visitor fv ON v.id = fv.visitor_id
	LEFT JOIN
		apartment apt ON vl.apartment_id = apt.id
	WHERE
        vl.id IS NOT NULL
	ORDER BY vl.visit_date DESC;

-- -----------------------------------------------------
-- View `roentgenium_new_eer`.`unclaimed_correspondence`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium_new_eer`.`unclaimed_correspondence`;
USE `roentgenium_new_eer`;
CREATE  OR REPLACE VIEW `unclaimed_correspondence` AS
    SELECT 
		m.id,
        apt.number_identifier AS apartment_identifier,
        apt.tower_id AS tower,
        m.mail_type,
        m.arrival_time,
        m.is_notified,
        m.is_claimed
    FROM
        mail m
	LEFT JOIN
		apartment apt ON m.apartment_id = apt.id
    WHERE
        m.is_claimed = 0;

-- -----------------------------------------------------
-- View `roentgenium_new_eer`.`currently_parked_vehicles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium_new_eer`.`currently_parked_vehicles`;
USE `roentgenium_new_eer`;
CREATE  OR REPLACE VIEW `currently_parked_vehicles` AS
    SELECT 
        v.id AS visitor_id,
        CONCAT(p.first_name, ' ', p.last_name) AS full_name,
        vv.license_plate,
        vv.parking_spot AS parked_at,
        vv.parking_date AS parked_since
    FROM
        vehicle_visitors vv
	LEFT JOIN
		visitor v ON v.id = vv.visitor_id
	LEFT JOIN
		person p ON p.id = v.person_id
    WHERE
        vv.parking_spot IS NOT NULL;

-- -----------------------------------------------------
-- View `roentgenium_new_eer`.`all_correspondence`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium_new_eer`.`all_correspondence`;
USE `roentgenium_new_eer`;
CREATE  OR REPLACE VIEW `all_correspondence` AS
SELECT 
		m.id,
        apt.number_identifier AS apartment_identifier,
        apt.tower_id AS tower,
        m.mail_type,
        m.arrival_time,
        m.is_notified,
        m.is_claimed
    FROM
        mail m
	LEFT JOIN
		apartment apt ON m.apartment_id = apt.id;

-- -----------------------------------------------------
-- View `roentgenium_new_eer`.`all_vehicles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium_new_eer`.`all_vehicles`;
USE `roentgenium_new_eer`;
CREATE  OR REPLACE VIEW `all_vehicles` AS
	SELECT 
        v.id AS visitor_id,
        CONCAT(p.first_name, ' ', p.last_name) AS full_name,
        GROUP_CONCAT(vv.license_plate SEPARATOR ', ') AS license_plates
    FROM
        vehicle_visitors vv
	LEFT JOIN
		visitor v ON v.id = vv.visitor_id
	LEFT JOIN
		person p ON p.id = v.person_id
	GROUP BY
        v.id, p.first_name, p.last_name;

-- -----------------------------------------------------
-- View `roentgenium_new_eer`.`message_view`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roentgenium_new_eer`.`message_view`;
USE `roentgenium_new_eer`;
CREATE  OR REPLACE VIEW `message_view` AS
    SELECT 
		msg.id AS message_id,
        msg.sender_id,
        CONCAT(sender.first_name, ' ', sender.last_name) AS sender_full_name,
        msg.message,
        msg.message_timestamp AS sent_at,
        apt.number_identifier AS apartment_number,
		t.id AS tower_number
    FROM
        messaging msg
    LEFT JOIN
        person sender ON msg.sender_id = sender.id
    LEFT JOIN
        inhabitant sender_inhabitant ON sender.id = sender_inhabitant.person_id
	LEFT JOIN
        apartment apt ON sender_inhabitant.apartment_id = apt.id
    LEFT JOIN
        tower t ON apt.tower_id = t.id;
	ORDER BY msg.message_timestamp DESC;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
