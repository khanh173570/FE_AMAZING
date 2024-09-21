import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import "./index.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function FormComponent({ formItems, title, api }) {
  const [form] = useForm();
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState(false);

  const handleFinish = async (values) => {
    console.log("values: ", values);

    if (title == "Change password") {
      if (values.newPassword != values.confirmPassword) {
        toast.error("Confirm password is not correct!");
      } else {
        const response = await axios.put(api, {
          password: values.newPassword,
        });
        console.log("Response: ", response);
        setPasswordUpdateStatus(true);
      }
    }
  };

  useEffect(() => {
    if (passwordUpdateStatus) {
      toast.success("Change password successfully");
      form.resetFields();
      setPasswordUpdateStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordUpdateStatus]);

  return (
    <div className="FormComponent">
      <h1>{title}</h1>
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
        {formItems}
      </Form>
    </div>
  );
}

export default FormComponent;
