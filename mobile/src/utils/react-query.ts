import { TPredictionResponse } from "@/src/types";
import { ReactNativeFile } from "apollo-upload-client";
import { SERVER_BASE_URL } from "../constants";

export const detectDisease = async ({ image }: { image: ReactNativeFile }) => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await fetch(`${SERVER_BASE_URL}/api/v1/feces/predict`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data as TPredictionResponse;
};
