import { useContext } from "react";
import { redirect, useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

const useAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) redirect('/users/login');
  
  return user;
};

const ProtectedRouter = () => {
  const location = useLocation();
  const isAuth = useAuth();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/users/login" replace state={{ from: location }} />
  );
};

export default ProtectedRouter;