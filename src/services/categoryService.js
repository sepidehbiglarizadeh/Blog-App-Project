import http from "./httpService";

export async function getCategoryApi(options) {
  return http.get("/category/list", options).then(({ data }) => data.data);
}
