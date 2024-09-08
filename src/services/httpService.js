import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          { withCredentials: true }
        );
        if (data) return app(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;

// accessToken => jwt => national-id => unique! => user id => jwt => in localStorage or cookie
// https only cookie => no access on browser (js) => safe =>
// id = 12345678 => jwt => HSFDJSHEFIUDFALSFGUYASFGASJDLASDLASFJPASFJ => cookies =>

// accessToken => 24 hrs =>
// refreshToken => 30 days =>

// 1. => access : OK => continue ...
// 2. => access : EXPIRE => 1. log out => ... 2. login => HOW ?? =>
// based on refreshToken => create new accessToken => 24 hrs , 30 days => ... continue ...
