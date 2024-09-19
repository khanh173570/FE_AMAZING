import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import "./index.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LeftOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
function Authen({ title, formItems, back, register }) {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    console.log(values);

    if (title === "Login") {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
      console.log(response.data);

      const accounts = response.data;

      const matchedAccount = accounts.find(
        (account) => account.phone === values.phone && account.password === values.password
      );

      console.log("Account: ", matchedAccount);

      if (matchedAccount) {
        if (matchedAccount.role === "admin") {
          localStorage.setItem("account", JSON.stringify(matchedAccount));
          toast.success("Login successfully");
          navigate("/admins");
        } else if (matchedAccount.role === "user") {
          localStorage.setItem("account", JSON.stringify(matchedAccount));
          toast.success("Login successfully");
          navigate("/");
        }
      } else {
        toast.error("Invalid phone or password!");
      }
    }
  };
  return (
    <div className="Authen">
      <div className="Authen__layout">
        <h1 className="Authen__title">{title}</h1>
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>
          {formItems}
        </Form>
        <div className="Authen__navigate">
          <Link to="/">
            <span>
              <LeftOutlined className="Authen__icon" />
            </span>
            {back}
          </Link>
          <Link to="/register">{register}</Link>
        </div>
      </div>
    </div>
  );
}

export default Authen;
