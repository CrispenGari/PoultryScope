### Poultry Scope

**Poultry Scope** 🐤🐣 Poultry Scope is a React Native mobile application that leverages AI (MobileNetV3) to predict poultry diseases based on feces analysis. The app connects to a server via a REST API, enabling farmers and poultry keepers to quickly and accurately assess the health of their flock.

<p algn="center">
  <img src="/images/adaptive-icon.png" alt="UI" width="200"/>
</p>

> This repository contains two main sub directory which are:

1. `mobile` - The mobile app that does predictions by sending requests to the API server using images of a poultry feces images.
2. `server` - This is an API server that serves an `MobileNetV3` model that does Disease detection based on on an poultry feces.

<p align="center">
  <a href="https://github.com/crispengari/PoultryScope/actions/workflows/ci.yml">
    <img src="https://github.com/crispengari/PoultryScope/actions/workflows/ci.yml/badge.svg" alt="CI Status">
  </a>
   <a href="https://github.com/crispengari/PoultryScope/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  </a>
  <a href="https://typescriptlang.org/">
    <img src="https://img.shields.io/badge/language-typescript-blue.svg" alt="Language: TypeScript">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/language-python-blue.svg" alt="Language: Python">
  </a>
</p>

### Features

- AI-powered disease prediction from poultry feces images
- Real-time results via REST API
- User-friendly mobile interface for both iOS and Android
- Helps farmers take proactive measures to protect their flock

### Technology Stack

- **Frontend:** React Native (Expo)
- **Backend/AI:** Python, FastAPI, MobileNetV3
- **API:** REST
- **Machine Learning:** PyTorch

### Usage

1. Capture or upload an image of poultry feces.
2. The app sends the image to the AI server for analysis.
3. Receive instant prediction results and recommended actions.

### Sample ScreenShots

The following screenshots shows the basic UI of the mobile application.

<p algn="center">
  <img src="/images/0.jpeg" alt="UI" width="200"/>
  <img src="/images/1.jpeg" alt="UI" width="200"/>
  <img src="/images/2.jpeg" alt="UI" width="200"/>
  <img src="/images/3.jpeg" alt="UI" width="200"/>
  <img src="/images/4.jpeg" alt="UI" width="200"/>
  <img src="/images/5.jpeg" alt="UI" width="200"/>
  <img src="/images/6.jpeg" alt="UI" width="200"/>
  <img src="/images/7.jpeg" alt="UI" width="200"/>
  <img src="/images/8.jpeg" alt="UI" width="200"/>
  <img src="/images/9.jpeg" alt="UI" width="200"/>
  <img src="/images/10.jpeg" alt="UI" width="200"/>
  <img src="/images/11.jpeg" alt="UI" width="200"/>
</p>

### 📸 Example Prediction

You can send the request to the server. Here are some examples of requests that are send to the server using `cURL` locally.

```shell
# healthy
cURL -X POST -F image=@healthy.jpg http://127.0.0.1:8000/api/v1/feces/predict

# coccidiosis
cURL -X POST -F image=@coccidiosis.jpg http://127.0.0.1:8000/api/v1/feces/predict

# salmonella
cURL -X POST -F image=@salmonella.jpg http://127.0.0.1:8000/api/v1/feces/predict

# newcastle
cURL -X POST -F image=@newcastle.jpg http://127.0.0.1:8000/api/v1/feces/predict

```

### Server API Response

The following is the API expected response.

```json
{
  "time": 0.19463062286376953,
  "ok": true,
  "status": "ok",
  "prediction": {
    "predictions": [
      { "label": 0, "probability": 0.0, "type": "coccidiosis" },
      { "label": 1, "probability": 1.0, "type": "healthy" },
      { "label": 2, "probability": 0.0, "type": "newcastle" },
      { "label": 3, "probability": 0.0, "type": "salmonella" }
    ],
    "top_prediction": { "label": 1, "probability": 1.0, "type": "healthy" }
  }
}
```

### Notebooks

The notebooks that were used to train the model can be found in this folder [`11_POULTRY_DISEASE_DETECTION`](https://github.com/CrispenGari/cv-torch/blob/main/11_POULTRY_DISEASE_DETECTION/00_mobilenetv3.ipynb).

### LICENSE

This project is using the [`MIT`](/LICENSE) LICENSE which reads as follows:
