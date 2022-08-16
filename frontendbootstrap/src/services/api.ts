import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenErro } from "./erros/AuthTokenErro";
import { singOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@meu.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (typeof window !== undefined) {
          singOut();
        } else {
          return Promise.reject(new AuthTokenErro());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
