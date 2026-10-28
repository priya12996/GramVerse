
import { post } from "./api";

export function loginUser(email, password) {
  return post("/auth/login", {
    email,
    password,
  });
}

export function registerUser(name, email, password, role = "citizen") {
  return post("/auth/register", {
    name,
    email,
    password,
    role,
  });
}
