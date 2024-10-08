import { Button, Form, Input, Modal, Popconfirm, Tag } from "antd";
import TableComponent from "../../../../components/componentAdmin/table";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function User() {
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status) => (status ? <Tag color="green">Active</Tag> : <Tag color="red">Not active</Tag>),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (id, record) => (
        <div className="action-buttons">
          <Button
            type="primary"
            style={{ width: "80px" }} // Optional inline style for button width
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
            onConfirm={() => handleDelete(id)}
            okText="Delete"
            cancelText="No"
          >
            <Button danger style={{ width: "80px" }}>
              Delete
            </Button>{" "}
            {/* Same width for Delete button */}
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
        status: false,
      });
      toast.success("Delete user successfully");
      setReload(!reload);
    } catch (error) {
      console.error("Error deleting user: ", error);
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
      if (edit && id) {
        await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: "user",
          status: true,
        });
        toast.success("Update user successfully");
      } else {
        await axios.post("https://6692a166346eeafcf46da14d.mockapi.io/account", {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: "user",
          status: true,
        });
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

  const fetchData = async () => {
    const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
    const filterUsers = response.data.filter((user) => user.role === "user");
    setUsers(filterUsers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("List of Users", 10, 10);

    const columns = ["Name", "Phone", "Email", "Role", "Status"];
    const rows = users.map((user) => [
      user.name,
      user.phone,
      user.email,
      user.role,
      user.status ? "Active" : "Not active",
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save("list_of_user.pdf");
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add new user
      </Button>
      <Button onClick={exportPDF}>Export to PDF</Button>
      <TableComponent
        columns={columns}
        api="https://6692a166346eeafcf46da14d.mockapi.io/account"
        title="List of user"
        reload={reload}
      />
      <Modal
        open={open}
        title={edit ? "Update user" : "Add new user"}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal} disabled={loading}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} disabled={loading} loading={loading}>
            {edit ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "You must enter the name!" }]}>
            <Input placeholder="Enter the name" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "You must enter the phone!" }]}>
            <Input placeholder="Enter the phone" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "You must enter the email!" },
              { type: "email", message: "Email is not valid type!" },
            ]}
          >
            <Input placeholder="Enter the email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "You must enter the password!" }]}
          >
            <Input.Password placeholder="Enter the password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
