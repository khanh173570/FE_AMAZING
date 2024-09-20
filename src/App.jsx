import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Censor from "./pages/CensorPage";
import Staff from "./pages/StaffPage";

// Layout and Pages
import CustomerApp from "./layout/CustomerApp/CustomerApp.jsx";
import HomePage from "./pages/CustomerPage/HomePage.jsx";
import PrivateRoute from "./components/componentAdmin/private-route/PrivateRoute.jsx";
import Admin from "./pages/AdminPage/index.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";

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
