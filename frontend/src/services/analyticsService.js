import { get } from "./api";

export function getSummary() {
  return get("/analytics/summary");
}