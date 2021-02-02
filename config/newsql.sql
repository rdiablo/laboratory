CREATE SCHEMA `laboratory` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `laboratory`.`organ` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `organ_code` VARCHAR(45) CHARACTER SET 'utf8' NULL,
  `organ_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `laboratory`.`user` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `rid` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `laboratory`.`role` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `menu` INT NULL,
  `permission` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `laboratory`.`permission` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `path` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `basename` VARCHAR(45) NOT NULL,
  `basepath` VARCHAR(45) NOT NULL,
  `show` TINYINT NOT NULL DEFAULT 1,
  `enable` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));
