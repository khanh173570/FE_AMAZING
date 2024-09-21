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
      const response = await axios.get(api);
      console.log("Response: ", response.data);
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setDataSource(data);
      setLoading(false);
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
