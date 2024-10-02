import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("account");

    if (!account) {
      toast.error("You must login before going to this page!");
      return navigate("/login");
    }

    const parseAccount = JSON.parse(account);
    const { role } = parseAccount;

    if (!["admin", "staff", "censor", "seller"].includes(role)) {
      toast.error("Your role cannot access this page!");
      return navigate("/login");
    }

    // Kiểm tra nếu role là hợp lệ nhưng không điều hướng đi đâu cả
  }, [navigate]);

  return children; // Trả về các phần tử con, ví dụ: CensorApp
}

export default PrivateRoute;
