-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema expense_tracker
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema expense_tracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `expense_tracker` ;
USE `expense_tracker` ;

-- -----------------------------------------------------
-- Table `expense_tracker`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expense_tracker`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `currency` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expense_tracker`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expense_tracker`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expense_tracker`.`expenses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expense_tracker`.`expenses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  `description` TEXT NULL,
  `date` DATETIME NOT NULL,
  `category_id` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_expenses_categories_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_expenses_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_expenses_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `expense_tracker`.`categories` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_expenses_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `expense_tracker`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expense_tracker`.`income`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expense_tracker`.`income` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  `description` TEXT NULL,
  `date` DATETIME NOT NULL,
  `category_id` INT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_income_categories1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_income_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_income_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `expense_tracker`.`categories` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_income_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `expense_tracker`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
