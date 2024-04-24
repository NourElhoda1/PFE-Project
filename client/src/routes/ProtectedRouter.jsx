// import { Outlet, Navigate } from 'react-router-dom'

// const ProtectedRouter = () => {
//     let auth = {'token':false}
//     return(
//         auth.token ? <Outlet/> : <Navigate to="/users/login"/>
//     )
// }

// export default ProtectedRouter

import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const useAuth = () => {
  const { user } = useContext(UserContext);
  return user && user.loggedIn;
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