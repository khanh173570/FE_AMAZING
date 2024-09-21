import { useEffect, useState } from "react";
import TableComponent from "../../../components/componentAdmin/table";
import { Tag } from "antd";

function Profile() {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const account = localStorage.getItem("account");

    const parseAccount = JSON.parse(account);

    const { id, name } = parseAccount;
    setId(id);
    setName(name);
  }, []);

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
  ];

  if (!id && !name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Profile">
      <TableComponent
        title={`Profile of ${name}`}
        columns={columns}
        api={`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`}
      />
    </div>
  );
}

export default Profile;
