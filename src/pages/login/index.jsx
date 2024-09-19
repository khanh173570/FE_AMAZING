import { Button, Form, Input } from "antd";
import Authen from "../../components/authen";
import "./index.scss";

function Login() {
  const formItems = (
    <>
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
    </>
  );
  return (
    <div className="Login">
      <Authen title="Login" formItems={formItems} back="Back" register="Register" />
    </div>
  );
}

export default Login;
