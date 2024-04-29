import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
