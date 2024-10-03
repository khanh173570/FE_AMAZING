import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("account");

    // Redirect to login if no account is found
    if (!account) {
      toast.error("You must log in before accessing this page!");
      navigate("/login");
      return;
    }

    const parseAccount = JSON.parse(account);
    const { role } = parseAccount;

    // Redirect to login if the role is not permitted
    if (!["admin", "staff", "censor", "seller"].includes(role)) {
      toast.error("Your role cannot access this page!");
      navigate("/login");
      return;
    }

    // Allow access if role is valid
  }, [navigate]);

  return children; // Render the child components
}

export default PrivateRoute;
