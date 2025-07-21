#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "WIFI-DCI";
const char* password = "DComInf_2K24";
const char* thingsboardServer = "http://iot.ceisufro.cl:8080";
const char* accessToken = "0zvxv0u6v2gtc42623ua";
const int sensorPin = 34;

void setup() {
  Serial.begin(115200);
  
  for(int i = 0; i < 20; i++) {
    int intensidad = analogRead(sensorPin);
    Serial.print("Lectura ");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.println(intensidad);
    delay(500);
  }

  Serial.println("\nAHORA ACERCA UNA FLAMA AL SENSOR!");
  Serial.println("Valores con flama:");

  WiFi.begin(ssid, password);
  Serial.print("Conectando al WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
}

void loop() {
  int intensidad = analogRead(sensorPin);
  unsigned long tiempo = millis() / 1000;

  Serial.print("Valor RAW del sensor: ");
  Serial.print(intensidad);

  String estado;
  if (intensidad < 500) {
    estado = "SEGURO";
  } else if (intensidad < 1000) {
    estado = "PRECAUCION";
  } else {
    estado = "PELIGRO";
  }
  Serial.println(" - Estado: " + estado);

  float voltaje = (intensidad / 4095.0) * 3.3;
  Serial.print("Voltaje: ");
  Serial.print(voltaje);
  Serial.println("V");

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(thingsboardServer) + "/api/v1/" + accessToken + "/telemetry";

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"intensidad\":" + String(intensidad) + 
                         ",\"tiempo\":" + String(tiempo) + 
                         ",\"estado\":\"" + estado + "\"" +
                         ",\"voltaje\":" + String(voltaje) + "}";

    Serial.print("Enviando: ");
    Serial.println(jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);
    if (httpResponseCode > 0) {
      Serial.print("Respuesta HTTP: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error en POST: ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  } else {
    Serial.println("WiFi no conectado, no se puede enviar datos.");
  }

  Serial.println("------------------------");
  delay(2000);
}
