import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/AdminPage";
import Censor from "./pages/CensorPage";
import Staff from "./pages/StaffPage";
import Register from "./pages/register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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
