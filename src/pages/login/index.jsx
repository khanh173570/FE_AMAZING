import { Button, Form, Input } from "antd";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

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
        navigate("/admin");
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
      }
    } else {
      toast.error("Invalid phone or password!");
    }
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
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
