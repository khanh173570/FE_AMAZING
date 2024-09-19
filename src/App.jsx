import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/AdminPage";

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
      path: "/admin",
      element: <Admin />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
