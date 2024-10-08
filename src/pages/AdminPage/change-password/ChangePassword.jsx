import { Button, Form, Input } from "antd";
import FormComponent from "../../../components/componentAdmin/form/Form";
import { useEffect, useState } from "react";
import "./changePassword.scss";

function ChangePassword() {
  const [id, setId] = useState(null);

  const getId = () => {
    const account = localStorage.getItem("account");
    const parseAccount = JSON.parse(account);
    const { id } = parseAccount;
    setId(id);
  };

  useEffect(() => {
    getId();
  }, []);

  if (!id) {
    return <div>Loading...</div>;
  }

  const formItems = (
    <>
      <Form.Item
        name="password"
        label="Old password"
        rules={[
          {
            required: true,
            message: "You must enter your old password!",
          },
        ]}
        style={{ width: "400px" }}
      >
        <Input.Password placeholder="Enter your old password" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: "You must enter your new password!",
          },
        ]}
        style={{ width: "400px" }}
      >
        <Input.Password placeholder="Enter your new password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm your new password"
        rules={[
          {
            required: true,
            message: "You must confirm your new password!",
          },
        ]}
        style={{ width: "400px" }}
      >
        <Input.Password placeholder="Enter your new password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="ChangePassword__button">
          Change password
        </Button>
      </Form.Item>
    </>
  );

  return (
    <div className="ChangePassword">
      <FormComponent
        title={`Change password`}
        formItems={formItems}
        api={`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`}
        loadingStatus={true}
      />
    </div>
  );
}

export default ChangePassword;
