import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Private({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("account");

    if (!account) {
      toast.error("You must login before going to this page!");
      return navigate("/login");
    }

    const parseAccount = JSON.parse(account);
    if (!["staff", "seller", "censor"].includes(parseAccount.role)) {
      toast.error("Your role cannot access this page!");
      return navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return children; // Return the wrapped children (CensorApp in this case)
}

export default Private;
