import { Button, Form, Input } from "antd";
import "./Register.scss";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";
import emailjs from "emailjs-com"; // Import EmailJS

function Register() {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    console.log(values);

    // Register the user
    const response = await axios.post("https://6692a166346eeafcf46da14d.mockapi.io/account", {
      phone: values.phone,
      email: values.email,
      name: values.name,
      password: values.password,
      role: "user",
      status: true,
    });

    console.log(response);

    toast.success("Register successfully. Please check your email");

    const emailData = {
      to_email: values.email,
      user_name: values.name,
      user_phone: values.phone,
      user_password: values.password,
      user_role: "user",
    };

    emailjs
      .send("service_r83vtoa", "template_97nldft", emailData, "bcPGKA4QICBzO0bg7")
      .then((result) => {
        console.log("Email successfully sent:", result.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    navigate("/login");
  };

  return (
    <div className="Register">
      <div className="Register__layout">
        <h1 className="Register__title">Register</h1>
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
                message: "Please enter your phone!",
              },
            ]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "Your email is not valid!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter your full name!",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="Register__navigate">
          <Link to="/login">
            <span>
              <LeftOutlined className="Login__icon" />
            </span>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
