-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema centralmusic
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema centralmusic
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `centralmusic` DEFAULT CHARACTER SET utf8mb4 ;
USE `centralmusic` ;

-- -----------------------------------------------------
-- Table `centralmusic`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralmusic`.`category` (
  `idCategory` INT(11) NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `centralmusic`.`marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralmusic`.`marca` (
  `idMarca` INT(11) NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMarca`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `centralmusic`.`subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralmusic`.`subcategory` (
  `idSubcategory` INT(11) NOT NULL AUTO_INCREMENT,
  `subcategory` VARCHAR(45) NOT NULL,
  `idCategory` INT(11) NOT NULL,
  PRIMARY KEY (`idSubcategory`),
  INDEX `fk_subcategory_category_idx` (`idCategory` ASC),
  CONSTRAINT `fk_subcategory_category`
    FOREIGN KEY (`idCategory`)
    REFERENCES `centralmusic`.`category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `centralmusic`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralmusic`.`product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `price` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `stock` VARCHAR(45) NOT NULL,
  `idSubcategory` INT(11) NOT NULL,
  `idMarca` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_marca_idx` (`idMarca` ASC),
  INDEX `fk_product_subcategory_idx` (`idSubcategory` ASC),
  CONSTRAINT `fk_product_marca`
    FOREIGN KEY (`idMarca`)
    REFERENCES `centralmusic`.`marca` (`idMarca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_subcategory`
    FOREIGN KEY (`idSubcategory`)
    REFERENCES `centralmusic`.`subcategory` (`idSubcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `centralmusic`.`guitar_electric_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralmusic`.`guitar_electric_details` (
  `id` INT(11) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `line` VARCHAR(45) NOT NULL,
  `body_finish` VARCHAR(45) NOT NULL,
  `material_body` VARCHAR(45) NOT NULL,
  `hand` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `material_fretboard` VARCHAR(45) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_electric_details_product_idx` (`product_id` ASC),
  CONSTRAINT `fk_guitar_electric_details_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `centralmusic`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
