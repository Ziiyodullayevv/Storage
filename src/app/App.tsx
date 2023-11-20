import "../styles/global.scss";

// global pages:
import Menu from "../components/Menu/Menu";

// pages:
import Analytic from "../pages/analytic/Analytic";
import Storage from "../pages/storage/Storage";
import Sale from "../pages/sale/Sale";
import ControlTask from "../pages/controlTask/ControlTask";
import ClientInfo from "../pages/clientInfo/ClientInfo";
import OrderHistory from "../pages/orderHistory/OrderHistory";
import Work from "../pages/work/Work";

// router:
import { Outlet, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";
import NotFound from "../components/404/NotFound";

const Layout = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Storage /> },
        { path: "/analytic", element: <Analytic /> },
        { path: "/sales", element: <Sale /> },
        { path: "/deadline", element: <ControlTask /> },
        { path: "/info", element: <ClientInfo /> },
        { path: "/history", element: <OrderHistory /> },
        { path: "/work", element: <Work /> },
      ],
    },
    {
      path: "signin",
      element: <SignIn />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
