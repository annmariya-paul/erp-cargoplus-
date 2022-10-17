import axios from "axios";
console.log("Public fetch base url : ", process.env.REACT_APP_BASE_URL);
const PublicFetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

PublicFetch.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

PublicFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error response : ", error);
    const prevRequest = error?.config;
    if (error?.response?.status === 400 && !prevRequest?.sent) {
      prevRequest.sent = true;
      //  logout();
      //  navigate(ROUTES.LOGIN, { replace: true });
      return PublicFetch(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default PublicFetch;
