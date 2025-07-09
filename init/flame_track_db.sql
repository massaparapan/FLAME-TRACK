-- ############################################################
-- #                                                          #
-- #  CREACIÓN DE LA BASE DE DATOS Y TABLAS PARA EL PROYECTO  #
-- #                                                          #
-- ############################################################

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  price VARCHAR(45) NOT NULL,
  features JSON,
  dashboard_id VARCHAR(255) NOT NULL 
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  token_access VARCHAR(255) NOT NULL UNIQUE
);
-- ####################################################################

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  plan_id INT NULL,
  CONSTRAINT fk_users_plans FOREIGN KEY(plan_id) REFERENCES plans(id)
);

-- ####################################################################

CREATE TABLE user_devices (
  user_id INT NOT NULL,
  device_id INT NOT NULL,
  PRIMARY KEY (user_id, device_id),
  CONSTRAINT fk_user_devices_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_devices_devices FOREIGN KEY(device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- ####################################################################

-- Se crea los planes
INSERT INTO plans (name, price, description, dashboard_id, features) VALUES
('FREE', 'GRATIS', 'Acceso básico a las funciones principales.', 'df348fc0-47b2-11f0-a76f-af9873efe2ab', 
 '["Monitoreo en tiempo real.", "Notificaciones push.", "Visualización intensidad."]'::json),
('PRO', '50.000', 'Funciones avanzadas como historial.', 'df348fc0-47b2-11f0-a76f-af9873efe2ab',
 '["Estadísticas avanzadas.", "Botón de pánico.", "Todas las funcionalidades del plan FREE."]'::json);