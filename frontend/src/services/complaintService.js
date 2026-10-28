

import { get, post } from "./api";

export function getComplaints() {
  return get("/complaints/");
}

export function createComplaint(data) {
  return post("/complaints/", data);
}