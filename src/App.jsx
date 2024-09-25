import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Censor from "./pages/CensorPage/CensorPage.jsx";
import Staff from "./pages/StaffPage";

// Layout and Pages
import CustomerApp from "./layout/CustomerApp/CustomerApp.jsx";
import CensorApp from "./layout/CensorApp/CensorApp.jsx";
import HomePage from "./pages/CustomerPage/HomePage.jsx";
import PrivateRoute from "./components/componentAdmin/private-route/PrivateRoute.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Admin from "./pages/AdminPage/Admin/index.jsx";
import Profile from "./pages/AdminPage/profile/Profile.jsx";
import ChangePassword from "./pages/AdminPage/change-password/ChangePassword.jsx";
import User from "./pages/AdminPage/account/user/User.jsx";
import ListStaff from "./pages/AdminPage/account/staff/Staff.jsx";
import TotalAccount from "./pages/AdminPage/account/total/index.jsx";
import ForgotPassword from "./pages/forgot-password/ForgotPassword.jsx";
import DistributorApp from './layout/DistributorApp/DistributorApp';
import DistributorHomePage from './pages/DistributorPage/DistributorHomePage/DistributorHomePage';
import ProductDetail from './pages/DistributorPage/ProductDetail.jsx/ProductDetail';
import AddProduct from './pages/DistributorPage/AddProduct/AddProduct';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerApp />, // Root path points to CustomerApp
      children: [
        {
          index: true, // HomePage is displayed by default at "/"
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/",
      element: <CustomerApp />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },

    {
      path: "/admin",
      element: <PrivateRoute />,
      children: [
        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
            {
              path: "list-user",
              element: <User />,
            },
            {
              path: "list-staff",
              element: <ListStaff />,
            },
            {
              path: "total-account",
              element: <TotalAccount />,
            },
          ],
        },
      ],
    },

    {

    path: "/censor",
    element: <CensorApp />, // Root path points to CustomerApp
    children: [
      {
        index: true, // HomePage is displayed by default at "/"
        element: <Censor />,
      },
    ],
  },


    {
      path: "/staff",
      element: <Staff />,
    },

    {
      path: "/seller",
      element: <DistributorApp />,
      children: [
        {
          index: true, // DistributorHomePage is displayed by default at "/seller"
          element: <DistributorHomePage />,
        },
        {
          path: "product/:id", // No leading slash; it appends to the parent path "/seller"
          element: <ProductDetail />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
       
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
