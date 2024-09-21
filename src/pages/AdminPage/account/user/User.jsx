import { Tag } from "antd";
import TableComponent from "../../../../components/componentAdmin/table";

function User() {
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
  return (
    <div>
      <TableComponent
        columns={columns}
        api={`https://6692a166346eeafcf46da14d.mockapi.io/account`}
        title={`List of user`}
      />
    </div>
  );
}

export default User;
