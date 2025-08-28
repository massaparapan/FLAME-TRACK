-- ############################################################
-- #                                                          #
-- #  CREACIÓN DE LA BASE DE DATOS Y TABLAS PARA EL PROYECTO  #
-- #                                                          #
-- ############################################################

-- ############################################################

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  price VARCHAR(45) NOT NULL,
  features JSON,
  dashboard_id VARCHAR(255) NOT NULL 
);

-- ############################################################

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  access_token VARCHAR(255) NOT NULL UNIQUE
);

-- ############################################################

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  plan_id INT NOT NULL,
  CONSTRAINT fk_users_plans FOREIGN KEY(plan_id) REFERENCES plans(id)
);

-- ############################################################

CREATE TABLE user_devices (
  user_id INT NOT NULL,
  device_id INT NOT NULL,
  PRIMARY KEY (user_id, device_id),
  CONSTRAINT fk_user_devices_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_devices_devices FOREIGN KEY(device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- ############################################################

-- ############################################################
-- #                                                          #
-- #               INSERCIÓN DE DATOS INICIALES               #
-- #                                                          #
-- ############################################################

INSERT INTO plans (name, price, description, dashboard_id, features) VALUES
('FREE', 'GRATIS', 'Acceso básico a las funciones principales.', 'df348fc0-47b2-11f0-a76f-af9873efe2ab?publicId=43598140-420e-11f0-a760-c34b83368612', 
 '["Monitoreo en tiempo real.", "Notificaciones push.", "Visualización intensidad."]'::json),
('PRO', '50.000', 'Funciones avanzadas.', 'f1e3b530-5d59-11f0-a77a-ad56499633ab?publicId=43598140-420e-11f0-a760-c34b83368612',
 '["Estadísticas avanzadas.", "Botón de pánico.", "Todas las funcionalidades del plan FREE."]'::json);