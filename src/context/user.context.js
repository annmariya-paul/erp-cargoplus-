import { createContext, useState } from "react";
const UserContext = createContext();

function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  const setUserTokenInfo = (token) => {
    setUserToken(token);
    localStorage.setItem("userToken", token);
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("rtb_usr");
    window.location.href = "/employer/login";
  };

  const isAuthenticated = () => {
    console.log("inside authentication function");
    let t = localStorage.getItem("userToken");
    if (!t) {
      console.log("********** Unauthorized");
      return false;
    } else {
      console.log("********** Authorized");
      return true;
    }
  };
  return (
    <UserContext.Provider
      value={{ logoutUser, isAuthenticated, setUserTokenInfo }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
