import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";

// eslint-disable-next-line react/prop-types
function TableComponent({ columns, api, title, reload }) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (title == "List of user") {
        const response = await axios.get(api);
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        const filterUser = sortedData.filter((user) => user.role == "user");
        console.log("FilterUSer: ", filterUser);
        setDataSource(filterUser);
        setLoading(false);
      } else {
        const response = await axios.get(api);
        console.log("Response: ", response.data);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setDataSource(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch table data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <div className="TableComponent">
      <h1>{title}</h1>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
}

export default TableComponent;
