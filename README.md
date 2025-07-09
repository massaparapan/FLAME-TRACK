# FLAME TRACK

**Un proyecto de Internet de las Cosas para la prevención de incendios, desarrollado para el curso ICC153-1 de la Universidad de la Frontera.**

Este proyecto presenta un sistema IoT de bajo costo para la **detección temprana de llamas en entornos domésticos**, como cocinas, con el fin de prevenir incendios. El sistema utiliza un **ESP32** junto a un sensor de flama infrarrojo para monitorear en tiempo real, enviando datos a través de **MQTT** a la plataforma **ThingsBoard**.

Los usuarios interactúan con el sistema a través de una aplicación móvil que ofrece un modelo de negocio **Freemium**, con un plan gratuito para monitoreo y alertas, y un plan Premium con funcionalidades avanzadas de análisis y control.

### Características Principales

#### Plan Free
* **Monitoreo en Tiempo Real:** Visualiza el estado actual del sensor (Seguro, Precaución, Peligro).
* **Notificaciones Push:** Recibe alertas instantáneas en tu móvil cuando se detecta una llama.
* **Visualización de Intensidad:** Observa el nivel de radiación IR detectado.

#### Plan Premium
* **Estadísticas Avanzadas:** Accede a gráficos de intensidad de las últimas 24 horas y semanal.
* **Control Local (Botón de Pánico):** Activa manualmente un buzzer de alerta sonora desde la aplicación.
* **Todas las funcionalidades del plan gratuito.**
