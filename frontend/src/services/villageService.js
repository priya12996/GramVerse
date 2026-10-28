import { get, post, del } from "./api";

export function getVillages() {
  return get("/villages/");
}

export function createVillage(data) {
  return post("/villages/", data);
}

export function deleteVillage(id) {
  return del(`/villages/${id}`);
}