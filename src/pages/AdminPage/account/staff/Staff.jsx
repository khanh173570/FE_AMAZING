import { Button, Form, Input, Modal, Popconfirm, Tag } from "antd";
import TableComponent from "../../../../components/componentAdmin/table";
import { useState, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ListStaff() {
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [staffData, setStaffData] = useState([]);

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
              setId(id);
              setIsEdit(true);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this staff?"
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
    try {
      const response = await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
        status: false,
      });
      console.log("Delete response: ", response);
      toast.success("Delete staff successfully");
      setReload(!reload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    form.resetFields();
    setIsEdit(false);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      if (isEdit && id) {
        const response = await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: "staff",
          status: true,
        });
        console.log(response);
        toast.success("Update staff successfully");
      } else {
        const response = await axios.post("https://6692a166346eeafcf46da14d.mockapi.io/account", {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: "staff",
          status: true,
        });
        console.log(response);
        toast.success("Add new staff successfully");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
        const filterUser = response.data.filter((user) => user.role == "staff");
        setStaffData(filterUser);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [reload]);
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("List of Staff", 10, 10);

    const columns = ["Name", "Phone", "Email", "Role", "Status"];

    const rows = staffData.map((item) => [
      item.name,
      item.phone,
      item.email,
      item.role,
      item.status ? "Active" : "Not Active",
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save("list_of_staff.pdf");
  };

  return (
    <div className="ListStaff">
      <div className="button">
        <Button type="primary" onClick={handleOpenModal}>
          Add new staff
        </Button>
        <Button onClick={exportPDF}>Export to PDF</Button>
      </div>
      <TableComponent
        columns={columns}
        api="https://6692a166346eeafcf46da14d.mockapi.io/account"
        title={`List of staff`}
        reload={reload}
      />
      <Modal
        open={open}
        title={isEdit ? "Update staff" : "Add new staff"}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal} disabled={loading}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} disabled={loading} loading={loading}>
            {isEdit ? "Update" : "Add"}
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
                message: "Email is not valid!",
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

export default ListStaff;
