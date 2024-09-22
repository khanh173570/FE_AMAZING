import { Button, Form, Input, Modal, Popconfirm, Tag } from "antd";
import TableComponent from "../../../../components/componentAdmin/table";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { toast } from "react-toastify";

function User() {
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);

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
        <>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue(record);
              setId(id);
              setEdit(true);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this user?"
            onConfirm={() => {
              handleDelete(id);
            }}
            okText="Delete"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
        status: false,
      });
      console.log("Delete response: ", response);
      toast.success("User status updated to inactive");
      setReload(!reload);
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
    setEdit(false);
    form.resetFields();
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Values: ", values);
      if (edit && id) {
        const response = await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: "user",
          status: true,
        });
        console.log("Response: ", response);
        toast.success("Update user successfully");
      } else {
        const response = await axios.post("https://6692a166346eeafcf46da14d.mockapi.io/account", {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: "user",
          status: true,
        });
        console.log("Response: ", response);
        toast.success("Add user successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setReload(!reload);
      form.resetFields();
      handleCloseModal();
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add new user
      </Button>
      <TableComponent
        columns={columns}
        api={`https://6692a166346eeafcf46da14d.mockapi.io/account`}
        title={`List of user`}
        reload={reload}
      />
      <Modal
        open={open}
        title={edit ? "Update user" : "Add new user"}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)} disabled={loading}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} disabled={loading} loading={loading}>
            {edit ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "You must enter the name!",
              },
            ]}
          >
            <Input placeholder="Enter the name" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "You must enter the phone!",
              },
            ]}
          >
            <Input placeholder="Enter the phone" />
          </Form.Item>
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
                message: "Email is not valid type!",
              },
            ]}
          >
            <Input placeholder="Enter the email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "You must enter the password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter the password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
