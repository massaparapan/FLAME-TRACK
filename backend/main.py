from typing import Union
from fastapi import FastAPI
import requests

app = FastAPI()

THINGSBOARD_URL = "http://iot.ceisufro.cl:8080"
USERNAME = "e.ortiz06@ufromail.cl"
PASSWORD = "efe12312"
DEVICE_ID = "701455a0-4797-11f0-a76f-af9873efe2ab"
KEYS = "sensor,tiempo,voltaje,nivel"


def get_token():
    url = f"{THINGSBOARD_URL}/api/auth/login"
    credentials = {
        "username": USERNAME,
        "password": PASSWORD
    }
    response = requests.post(url, json=credentials)
    response.raise_for_status()
    return response.json()["token"]


def get_telemetry(token: str):
    headers = {"X-Authorization": f"Bearer {token}"}
    url = f"{THINGSBOARD_URL}/api/plugins/telemetry/DEVICE/{DEVICE_ID}/values/timeseries?keys={KEYS}"
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

@app.get("/datos")
def obtener_datos():
    try:
        token = get_token()
        data = get_telemetry(token)
        return data
    except Exception as e:
        return {"error": str(e)}
