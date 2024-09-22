import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form] = useForm();
  const [isEmail, setIsEmail] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [existEmail, setExistEmail] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const handleForgot = async (values) => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");

      const account = response.data.find((account) => account.email === values.email);

      if (account) {
        setId(account.id);
        setExistEmail(account.email);
        toast.success("Enter your new password");
        setIsEmail(false);
      } else {
        toast.error("Your email does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleForgot();
  }, []);

  const handleReset = async (values) => {
    console.log(values);

    if (values.confirmPassword !== values.newPassword) {
      toast.error("Confirm password is not correct!");
      form.resetFields();
    } else {
      try {
        const reponse = await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          password: values.newPassword,
        });
        console.log(reponse);
        toast.success("Change password successfully");
        setIsEmail(false);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="ForgotPassword">
      <div className="ForgotPassword__content">
        {isEmail ? (
          <>
            <h1>Forgot password</h1>
            <Form form={form} labelCol={{ span: 24 }} onFinish={handleForgot}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "You must enter the email!",
                  },
                  {
                    type: "email",
                    message: "Email is not valid!",
                  },
                ]}
                style={{ width: 500 }}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="ForgotPassword__button">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <h1>Reset password</h1>
            <Form form={form} labelCol={{ span: 24 }} onFinish={handleReset}>
              <Form.Item
                name="newPassword"
                label="New password"
                rules={[
                  {
                    required: true,
                    message: "You must enter the new password!",
                  },
                ]}
                style={{ width: 500 }}
              >
                <Input.Password placeholder="Enter your new password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm password"
                rules={[
                  {
                    required: true,
                    message: "You must enter the confirm password!",
                  },
                ]}
                style={{ width: 500 }}
              >
                <Input.Password placeholder="Enter your confirm password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="ForgotPassword__button">
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
