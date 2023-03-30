import axios from "axios";

console.log("Public fetch base url : ", process.env.REACT_APP_BASE_URL);
// export function saveTokenInLocalStorage(tokenDetails){
//   localStorage.setItem('userDetails',JSON.stringify(tokenDetails));
// }

const token = JSON.parse(localStorage.getItem("user"));
console.log("Access", token?.accessToken);
const PublicFetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    allowCredentials: true,
    // Authorization:"Bearer"+token.access_token,
    "Content-Type": "application/json",
  },
});

PublicFetch.interceptors.request.use(
  (config) => {
    console.log(config, "Config");
    console.log(localStorage.getItem("UserToken", "userPermissions"));
    // config.headers.Authorization="Bearer"+ " " + token?.accessToken
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("UserToken", "userPermissions")
      )}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
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
    ///401 Unauthorized
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      localStorage.removeItem("UserToken");
      window.location.href = "/";
      return PublicFetch(prevRequest);
    }

    return Promise.reject(error);
  }
);

export default PublicFetch;
