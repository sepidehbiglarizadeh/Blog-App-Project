import http from "./httpService";

export async function signupApi(data) {
  return http.post(`/user/signup`, data).then(({ data }) => data.data);
}

export async function singinApi(data) {
  return http.post(`/user/signin`, data).then(({ data }) => data);
}

export async function getUserApi(options) {
  return http.get(`/user/profile`, options).then(({ data }) => data);
}