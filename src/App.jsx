import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/AdminPage";
import Censor from "./pages/CensorPage";
import Staff from "./pages/StaffPage";

// Layout and Pages
import CustomerApp from './layout/CustomerApp/CustomerApp.jsx';
import HomePage from './pages/CustomerPage/HomePage.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/", 
      element: <CustomerApp />,  // Root path points to CustomerApp
      children: [
        {
          index: true,  // HomePage is displayed by default at "/"
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <Admin />,
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
