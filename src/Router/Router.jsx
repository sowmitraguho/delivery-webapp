import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'sendparcel',
          element: <PrivateRoute><SendParcel/></PrivateRoute>
        },
        {
          path: 'coverage',
          Component: Coverage
        },
        {
          path: 'dashboard',
          element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>
        }
    ],
    
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'signup',
        Component: SignUp
      }
    ]
  }
]);
