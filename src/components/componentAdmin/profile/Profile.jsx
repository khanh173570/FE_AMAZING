import { useEffect, useState } from "react";
import TableComponent from "../table";
import { Button } from "antd";

function Profile() {
  const [id, setId] = useState({});
  const [name, setName] = useState({});

  useEffect(() => {
    const account = localStorage.getItem("account");
    const parseAccount = JSON.parse(account);
    const { id, name } = parseAccount;
    console.log("ID: ", id);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Button type="primary">Update</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div>
        <TableComponent
          columns={columns}
          api={`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`}
          title={`Profile of ${name}`}
        />
      </div>
    </div>
  );
}

export default Profile;
