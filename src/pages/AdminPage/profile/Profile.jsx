import { useEffect, useState } from "react";
import TableComponent from "../../../components/componentAdmin/table";
import { Button, Form, Input, Modal, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const account = localStorage.getItem("account");

    if (account) {
      const parseAccount = JSON.parse(account);
      const { id, name } = parseAccount;
      setId(id);
      setName(name);

      if (id) {
        fetchData(id);
      }
    } else {
      toast.error("No account found in local storage");
    }
  }, [reload]);

  const fetchData = async (accountId) => {
    try {
      const response = await axios.get(`https://6692a166346eeafcf46da14d.mockapi.io/account/${accountId}`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? <Tag color="green">Active</Tag> : <Tag color="red">Not active</Tag>),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            form.setFieldsValue(record);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (!id && !name) {
    return <div>Loading...</div>;
  }

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, values);
      toast.success("Profile updated successfully");
      form.resetFields();
      setOpenModal(false);
      setReload(!reload);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Profile">
      <TableComponent
        title={`Profile of ${name}`}
        columns={columns}
        api={`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`}
        reload={reload}
      />
      <Modal
        title={"Edit profile"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button key="back" onClick={() => setOpenModal(false)} disabled={loading}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} loading={loading} disabled={loading}>
            Edit
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Profile;
