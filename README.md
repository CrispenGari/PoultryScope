### Poultry Scope

**Poultry Scope** 🐤🐣 Poultry Scope is a React Native mobile application that leverages AI (MobileNetV3) to predict poultry diseases based on feces analysis. The app connects to a server via a REST API, enabling farmers and poultry keepers to quickly and accurately assess the health of their flock.

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
