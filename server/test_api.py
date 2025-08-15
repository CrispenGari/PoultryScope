from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


class TestApI:
    def test_root(self):
        res = client.get("/")
        assert res.status_code == 200
        assert res.json() == {
            "title": "PoultryScope API",
            "description": "API for detecting disease in poultry feces.",
            "version": "0.0.1",
        }

    def test_prediction_with_error_1(self):
        res = client.post("/api/v1/feces/predict/unknown")
        assert res.status_code == 404

    def test_healthy_prediction(self):
        files = {"image": ("images/healthy.jpg", open("images/healthy.jpg", "rb"))}
        res = client.post("/api/v1/feces/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]['top_prediction']["label"] == 1
        assert data["prediction"]['top_prediction']["type"] == "healthy"

    def test_salmonella_prediction(self):
        files = {"image": ("images/salmonella.jpg", open("images/salmonella.jpg", "rb"))}
        res = client.post("/api/v1/feces/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]['top_prediction']["label"] == 3
        assert data["prediction"]['top_prediction']["type"] == "salmonella"

    def test_coccidiosis_prediction(self):
        files = {"image": ("images/coccidiosis.jpg", open("images/coccidiosis.jpg", "rb"))}
        res = client.post("/api/v1/feces/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]['top_prediction']["label"] == 0
        assert data["prediction"]['top_prediction']["type"] == "coccidiosis"

    def test_newcastle_prediction(self):
        files = {"image": ("images/newcastle.jpg", open("images/newcastle.jpg", "rb"))}
        res = client.post("/api/v1/feces/predict", files=files)
        data = res.json()

        assert res.status_code == 200
        assert data["ok"] is True
        assert data["status"] == "ok"
        assert data["prediction"]['top_prediction']["label"] == 2
        assert data["prediction"]['top_prediction']["type"] == "newcastle"
