import { post, get } from "./api";

export function predictCrop(data) {
  return post("/crop/predict", data);
}

export function getCropHistory() {
  return get("/crop/history");
}