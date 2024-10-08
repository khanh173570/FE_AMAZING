import { Button, Form, Input } from "antd";
import "./Login.scss";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";

function Login() {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
    console.log(response.data);

    const accounts = response.data;
    console.log(accounts);

    const trueAccounts = accounts.filter((account) => account.status === true);

    const matchedAccount = trueAccounts.find(
      (account) => account.phone === values.phone && account.password === values.password
    );

    console.log("Account: ", matchedAccount);

    if (matchedAccount) {
      if (matchedAccount.role === "admin") {
        localStorage.setItem("account", JSON.stringify(matchedAccount));
        toast.success("Login successfully");
        navigate("/admin/dashboard");
      } else if (matchedAccount.role === "user") {
        localStorage.setItem("account", JSON.stringify(matchedAccount));
        toast.success("Login successfully");
        navigate("/");
      } else if (matchedAccount.role === "censor") {
        localStorage.setItem("account", JSON.stringify(matchedAccount));
        toast.success("Login successfully");
        navigate("/censor");
      } else if (matchedAccount.role === "staff") {
        localStorage.setItem("account", JSON.stringify(matchedAccount));
        toast.success("Login successfully");
        navigate("/staff");
      } else if (matchedAccount.role === "seller") {
        localStorage.setItem("account", JSON.stringify(matchedAccount));
        toast.success("Login successfully");
        navigate("/seller");
      }
    } else {
      toast.error("Invalid phone or password!");
    }
  };

  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("Google credential:", credential);
        console.log("Google user:", user);

        try {
          const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
          const accounts = response.data;

          const matchedAccount = accounts.find((account) => account.email === user.email);

          if (matchedAccount) {
            localStorage.setItem("account", JSON.stringify(matchedAccount));
            toast.success("Login successfully");

            switch (matchedAccount.role) {
              case "admin":
                navigate("/admin");
                break;
              case "user":
                navigate("/");
                break;
              case "censor":
                navigate("/censor");
                break;
              case "staff":
                navigate("/staff");
                break;
              default:
                navigate("/");
            }
          } else {
            toast.error("Account does not exist. Please register!");
            navigate("/register");
          }
        } catch (error) {
          console.log("Error fetching:", error);
          toast.error("Failed to login with Google.");
        }
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        toast.error("Google login failed.");
      });
  };

  return (
    <div className="Login">
      <div className="Login__layout">
        <h1 className="Login__title">Login</h1>
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please enter phone!",
              },
            ]}
            style={{ width: "500px" }}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
            style={{ width: "500px" }}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Link to="/forgot-password" className="forgot">
            Forgot password?
          </Link>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="Login__layout__button">
              Login
            </Button>
          </Form.Item>
        </Form>
        <h2 className="Login__title or">Or</h2>
        <Button className="google" onClick={handleLoginGoogle}>
          <span>
            <img src="../src/assets/google.png" alt="Google" />
          </span>
          Login by Google
        </Button>
        <div className="Login__navigate">
          <Link to="/">
            <span>
              <LeftOutlined className="Login__icon" />
            </span>
            Back
          </Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
