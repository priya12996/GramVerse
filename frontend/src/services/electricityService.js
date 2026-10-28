import { get, post, patch } from "./api";

export function getOutages() {
  return get("/electricity/outages");
}

export function reportOutage(data) {
  return post("/electricity/outages", data);
}

export function updateOutageStatus(id, status) {
  return patch(`/electricity/outages/${id}`, { status });
}