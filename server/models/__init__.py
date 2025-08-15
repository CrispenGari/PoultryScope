import torch
import os
import io

from torch.nn import functional as F
from torchvision import transforms
import numpy as np
from PIL import Image
from torchvision import models
from torch import nn
from utility_types import Prediction, Response


class_names = ["coccidiosis", "healthy", "newcastle", "salmonella"]
OUTPUT_DIM = 1 if len(class_names) == 2 else len(class_names)
means = torch.tensor([0.5892, 0.5628, 0.5127])
stds = torch.tensor([0.1514, 0.1529, 0.1645])
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
pretrained_size = 224

mobilenetv3_path = os.path.join(os.getcwd(), "models/static/mobilenetv3.pt")

print(" *  LOADING MODELS")
mobilenetv3 = models.mobilenet_v3_large(weights=False).to(device)
mobilenetv3.classifier[-1] = nn.Linear(
    mobilenetv3.classifier[-1].in_features, OUTPUT_DIM
).to(device)
mobilenetv3.load_state_dict(torch.load(mobilenetv3_path, map_location=device))
print("\n *  LOADING MODELS COMPLETE")

image_transforms = {
    "test": transforms.Compose(
        [
            transforms.Resize(pretrained_size),
            transforms.ToTensor(),
            transforms.Normalize(mean=means, std=stds),
        ]
    ),
}


def preprocess_img(img):
    """
    takes in an image path and pre process it
    """
    img = image_transforms["test"](Image.open(io.BytesIO(img)).convert("RGB"))
    return img


def predict_disease(model, image, device):
    image = preprocess_img(image).to(device)
    model.eval()
    with torch.no_grad():
        image = image.unsqueeze(dim=0).to(device)
        preds = model(image)
        preds = F.softmax(preds, dim=1).detach().cpu().numpy().squeeze()
        predicted_label = np.argmax(preds)
        predictions = [
            Prediction(label=i, type_=class_names[i], probability=np.round(preds[i], 2))
            for i, _ in enumerate(preds)
        ]
        predicted = Prediction(
            label=predicted_label,
            type_=class_names[predicted_label],
            probability=np.round(preds[predicted_label], 2),
        )
        return Response(top_prediction=predicted, predictions=predictions)
