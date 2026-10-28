import { post, get } from "./api";

export function predictWater(data) {
  return post("/water/predict", data);
}

export function getWaterHistory() {
  return get("/water/history");
}