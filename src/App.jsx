import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";



// admin
import Admin from "./pages/AdminPage";



// Censor
import Censor from "./pages/CensorPage";




//Staff
import Staff from "./pages/StaffPage";






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
