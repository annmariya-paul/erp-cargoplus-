import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/index";
const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated } = useContext(UserContext);
  let authenticated = isAuthenticated();
  console.log("inside proteced route");
  return authenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
