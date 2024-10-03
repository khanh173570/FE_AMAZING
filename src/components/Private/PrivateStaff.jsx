import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateStaff({ children }) { // Accept children as a prop
  const navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("account");

    if (!account) {
      toast.error("You must login before going to this page!");
      return navigate("/login");
    }

    const parseAccount = JSON.parse(account);
    if (parseAccount.role !== "staff") {
      toast.error("Your role cannot go to this page!");
      return navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return children; // Return the children prop to render the wrapped components
}

export default PrivateStaff;
