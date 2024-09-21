import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Censor from "./pages/CensorPage";
import Staff from "./pages/StaffPage";

// Layout and Pages
import CustomerApp from "./layout/CustomerApp/CustomerApp.jsx";
import HomePage from "./pages/CustomerPage/HomePage.jsx";
import PrivateRoute from "./components/componentAdmin/private-route/PrivateRoute.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Admin from "./pages/AdminPage/Admin/index.jsx";
import Profile from "./pages/AdminPage/profile/Profile.jsx";
import ChangePassword from "./pages/AdminPage/change-password/ChangePassword.jsx";
import User from "./pages/AdminPage/account/user/User.jsx";

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
          ],
        },
      ],
    },

    {
      path: "/censor",
      element: <Censor />,
    },
    {
      path: "/staff",
      element: <Staff />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
