import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import AccountPage from "./pages/Account";
import TopUpPage from "./pages/TopUp";
import Transaction from "./pages/Transaction";
import Pembayaran from "./pages/Pembayaran";

const ProtectedRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.login.isLogin);

  if (!isLogin || isLogin === null) {
    return <Navigate to="/Login" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },

  // Routes with Layout
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/top-up",
        element: (
          <ProtectedRoute>
            <TopUpPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Pembayaran/:nama",
        element: (
          <ProtectedRoute>
            <Pembayaran />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Transaction",
        element: (
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
