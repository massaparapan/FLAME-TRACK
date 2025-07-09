-- #################################################################
-- #                                                               #
-- #  CREACIÓN DE LA BASE DE DATOS Y TABLAS PARA EL PROYECTO (v2)  #
-- #                                                               #
-- #################################################################

CREATE TABLE `plans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL, 
  `price` VARCHAR(45) NOT NULL, 
  `panel_id` VARCHAR(255) NOT NULL COMMENT 'ID del dashboard en ThingsBoard para este plan',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `devices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token_access` VARCHAR(255) NOT NULL UNIQUE COMMENT 'Token de acceso del dispositivo (del QR)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ####################################################################

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL COMMENT 'Guardar siempre contraseñas hasheadas',
  `plan_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_plans_idx` (`plan_id` ASC),
  CONSTRAINT `fk_users_plans`
    FOREIGN KEY (`plan_id`)
    REFERENCES `plans` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ####################################################################

CREATE TABLE `user_devices` (
  `user_id` INT NOT NULL,
  `device_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `device_id`),
  INDEX `fk_user_devices_devices_idx` (`device_id` ASC),
  CONSTRAINT `fk_user_devices_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_devices_devices`
    FOREIGN KEY (`device_id`)
    REFERENCES `devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ####################################################################

-- Se crea los planes
INSERT INTO `plans` (`name`, `price`,`description`,`panel_id`) VALUES
('free', "GRATIS",'Acceso básico a las funciones principales', 'ID_DEL_DASHBOARD_GRATUITO'),
('pro', "50.000",'Funciones avanzadas como historial', 'ID_DEL_DASHBOARD_PROFESIONAL');