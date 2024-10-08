import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
import PieChart from "./../../../../components/componentAdmin/piechart/PieChart";

function TotalAccount() {
  const [admin, setAdminCount] = useState(0);
  const [user, setUserCount] = useState(0);
  const [staff, setStaffCount] = useState(0);
  const [censor, setCensorCount] = useState(0);
  const [seller, setSellerCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
      const accounts = response.data;

      const adminCount = accounts.filter((account) => account.role === "admin").length;
      const userCount = accounts.filter((account) => account.role === "user").length;
      const staffCount = accounts.filter((account) => account.role === "staff").length;
      const censorCount = accounts.filter((account) => account.role === "staff").length;
      const sellerCount = accounts.filter((account) => account.role === "staff").length;

      setAdminCount(adminCount);
      setUserCount(userCount);
      setStaffCount(staffCount);
      setCensorCount(censorCount);
      setSellerCount(sellerCount);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const newDataSource = [
      { key: "1", role: "Admin", count: admin },
      { key: "2", role: "User", count: user },
      { key: "3", role: "Staff", count: staff },
      { key: "4", role: "Censor", count: censor },
      { key: "5", role: "Seller", count: seller },
    ];
    console.log("New Data Source:", newDataSource);
    setDataSource(newDataSource);
  }, [admin, user, staff, censor, seller]);

  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div className="TotalAccount">
      <PieChart
        className="TotalAccount__pie"
        adminCount={admin}
        userCount={user}
        staffCount={staff}
        censorCount={censor}
        sellerCount={seller}
        title={`Total Account`}
      />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}

export default TotalAccount;
