import { Navigate, Outlet } from "react-router-dom";
import { listRoutes } from "./Router";
import { useContext } from "react";
import { MyContext, Icontext } from "../store/AppContext";
import Header from "./Header/Header";

const PrivateRoutes = () => {
  const { store } = useContext(MyContext) as Icontext;

  return store.isUserAuth !== null ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={listRoutes.AUTH} />
  );
};

export default PrivateRoutes;
