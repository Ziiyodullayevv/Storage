import "../styles/global.scss";
import React from "react";

// global pages:
import Menu from "../components/Menu/Menu";

// pages:
const StorageList = React.lazy(() => import("../pages/analytic/Analytic"));
const Analytic = React.lazy(() => import("../pages/order/Order"));
const Sale = React.lazy(() => import("../pages/product/Product"));
const ControlTasks = React.lazy(() => import("../pages/task/Task"));
const ClientInfo = React.lazy(() => import("../pages/client/Client"));
const OrderHistory = React.lazy(() => import("../pages/storage/Storage"));
const Work = React.lazy(() => import("../pages/spare/Spare"));

// slider-component:
import Slider from "../components/slider/Slider";

// router:
import { Outlet, createBrowserRouter } from "react-router-dom";
import { RouterProvider, useNavigate } from "react-router";

// login-pages:
const SignIn = React.lazy(() => import("../components/signIn/SignIn"));
const SignUp = React.lazy(() => import("../components/signUp/SignUp"));

// not-found page:
import NotFound from "../components/404/NotFound";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return (
    <React.Fragment>
      <div className="main">
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">{token ? <Outlet /> : null}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

// --------------------------------------------------------------------

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
        {
          path: "/",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <StorageList />
            </React.Suspense>
          ),
        },
        {
          path: "/analytic",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <Analytic />
            </React.Suspense>
          ),
        },
        {
          path: "/sales",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <Sale />
            </React.Suspense>
          ),
        },
        {
          path: "/tasks",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <ControlTasks />
            </React.Suspense>
          ),
        },
        {
          path: "/info",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <ClientInfo />
            </React.Suspense>
          ),
        },
        {
          path: "/history",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <OrderHistory />
            </React.Suspense>
          ),
        },
        {
          path: "/work",
          element: (
            <React.Suspense
              fallback={
                <React.Fragment>
                  <Slider />
                </React.Fragment>
              }
            >
              <Work />
            </React.Suspense>
          ),
        },
      ],
    },
    {
      path: "signin",
      element: (
        <React.Suspense
          fallback={
            <React.Fragment>
              <Slider />
            </React.Fragment>
          }
        >
          <SignIn />
        </React.Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <React.Suspense
          fallback={
            <React.Fragment>
              <Slider />
            </React.Fragment>
          }
        >
          <SignUp />
        </React.Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
