import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("account");

    if (!account) {
      toast.error("You must login before going to this page!");
      return navigate("/login");
    }

    const parseAccount = JSON.parse(account);
    if (parseAccount.role !== "admin") {
      toast.error("Your role cannot going to this page!");
      return navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
}

export default PrivateRoute;
