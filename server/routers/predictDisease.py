from fastapi import APIRouter, File
from fastapi.responses import JSONResponse
from typing import Annotated
from models import (
    mobilenetv3,
    predict_disease,
    device,
)
import time


predictDiseaseRouter = APIRouter(prefix="/api/v1/feces")


@predictDiseaseRouter.post("/predict")
def predict_feces_(image: Annotated[bytes, File()]):
    start = time.time()
    try:
        prediction = predict_disease(mobilenetv3, image, device=device)
        return JSONResponse(
            {
                "time": time.time() - start,
                "ok": True,
                "status": "ok",
                "prediction": prediction.to_json(),
            },
            status_code=200,
        )
    except Exception:
        JSONResponse(
            {
                "time": time.time() - start,
                "ok": False,
                "field": "server",
                "status": "error",
                "message": "Internal Server Error.",
            },
            status_code=500,
        )
