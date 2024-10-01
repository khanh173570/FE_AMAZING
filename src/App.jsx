import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Censor from "./pages/CensorPage/CensorPages.jsx";
import Staff from "./pages/StaffPage/StaffPage/StaffPage.jsx";

// Layout and Pages
import CustomerApp from "./layout/CustomerApp/CustomerApp.jsx";
import CensorApp from "./layout/CensorApp/CensorApp.jsx";
import HomePage from "./pages/CustomerPage/HomePage.jsx";
import PrivateRoute from "./components/componentAdmin/private-route/PrivateRoute.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Admin from "./pages/AdminPage/Admin/index.jsx";
import Dashboard from "./pages/AdminPage/dashboard/Dashboard.jsx";
import Profile from "./pages/AdminPage/profile/Profile.jsx";
import ChangePassword from "./pages/AdminPage/change-password/ChangePassword.jsx";
import User from "./pages/AdminPage/account/user/User.jsx";
import ListStaff from "./pages/AdminPage/account/staff/Staff.jsx";
import TotalAccount from "./pages/AdminPage/account/total/index.jsx";
import ForgotPassword from "./pages/forgot-password/ForgotPassword.jsx";
import DistributorApp from "./layout/DistributorApp/DistributorApp";
import DistributorHomePage from "./pages/DistributorPage/DistributorHomePage/DistributorHomePage";
import SellerProductDetail from "./pages/DistributorPage/SellerProductDetail/SellerProductDetail.jsx";
import SellerAddProduct from "./pages/DistributorPage/SellerAddProduct/SellerAddProduct";
import StaffApp from "./layout/StaffApp/StaffApp.jsx";
import ProductEditPage from "./pages/StaffPage/StaffPage/ProductEditPage/ProductEditPage.jsx";
import CensorStaffPage from "./pages/StaffPage/StaffPage/CensorStaffPage/CensorStaffPage.jsx";
import CensorAddPage from "./pages/StaffPage/StaffPage/CensorAddPage/CensorAddPage.jsx";
import CensorEditPage from "./pages/StaffPage/StaffPage/CensorEditPage/CensorEditPage.jsx";
import ProductDetail from "./pages/CensorPage/ProductDetail.jsx";
import ProductUserDetail from "./pages/CustomerPage/ProductUserDetail.jsx";
import MiniShoppingCart from "./pages/CustomerPage/MiniShoppingCart.jsx";

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
        {
          path: "/productUserDetail",
          element: <ProductUserDetail />,
        },
        {
          path: "/minishoppingcart",
          element: <MiniShoppingCart />,
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
              path: "dashboard",
              element: <Dashboard />,
            },
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
      element: (
        <PrivateRoute>
          <CensorApp /> {/* CensorApp chứa header, footer và Outlet */}
        </PrivateRoute>
      ),
      children: [
        {
          index: true, // HomePage is displayed by default at "/censor"
          element: <Censor />,
        },
        {
          path: "product/:id", // Không có dấu "/" ở đầu, ghép vào "/censor"
          element: <ProductDetail />,
        },
      ],
    },
    

    {
      path: "/staff",
      element: (
        <PrivateRoute>
          <StaffApp />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Staff />,
        },
        {
          path: "/staff/editproduct/:id",
          element: <ProductEditPage />,
        },
        {
          path: "/staff/censorstaff",
          element: <CensorStaffPage />,
        },
        {
          path: "/staff/addstaff",
          element: <CensorAddPage />,
        },
        {
          path: "/staff/editstaff/:id",
          element: <CensorEditPage />,
        },
      ],
    },

    {
      path: "/seller",
      element: (
        <PrivateRoute>
          <DistributorApp />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <DistributorHomePage />,
        },
        {
          path: "product/:id",
          element: <SellerProductDetail />,
        },
        {
          path: "add-product",
          element: <SellerAddProduct />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
