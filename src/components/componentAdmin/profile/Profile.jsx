import { useEffect, useState } from "react";
import TableComponent from "../table";
import { Button, message } from "antd";

function Profile() {
  const [id, setId] = useState(null); // Initial state null to ensure it's ready before the API call
  const [name, setName] = useState("");

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      const parseAccount = JSON.parse(account);
      const { id, name } = parseAccount;
      console.log("ID: ", id);
      setId(id);
      setName(name);
    } else {
      message.error("No account found in localStorage");
    }
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

  if (!id) {
    return <div>Loading...</div>;
  }

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
