import React, { useState, useEffect } from "react";
import { Spinner, Button, Form, Table, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CensorPages.css";

const CensorPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    fetch("https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleSave = (item) => {
    const updatedProduct = {
      ...item,
      status: statusUpdates[item.id] || item.status, // Use the new status if it exists
    };

    fetch(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        return response.json();
      })
      .then(() => {
        setData((prevData) =>
          prevData.map((prod) =>
            prod.id === updatedProduct.id ? updatedProduct : prod
          )
        );
        setStatusUpdates((prev) => ({ ...prev, [item.id]: undefined })); // Clear the status after saving
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="all-in">
      <div className="border-container">
        <div className="title">Danh Sách Sản Phẩm Đang Chờ Duyệt</div>
        <Table striped bordered hover>
          <thead className="header-row">
            <tr style={{ textAlign: "center" }}>
              <th style={{ backgroundColor: "#CFCFCF" }}>Product Name</th>
              <th style={{ backgroundColor: "#CFCFCF" }}>Artist</th>
              <th style={{ backgroundColor: "#CFCFCF" }}>Product ID</th>
              <th style={{ backgroundColor: "#CFCFCF" }}>Price</th>
              <th style={{ backgroundColor: "#CFCFCF" }}>Type</th>
              <th style={{ backgroundColor: "#CFCFCF" }}>Status</th>
              <th style={{ backgroundColor: "#CFCFCF" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={{ textAlign: "center" }}>
                <td>{item.name}</td>
                <td>{item.artist}</td>
                <td>{item.id}</td>
                <td>${item.price}</td>
                <td>{item.type}</td>
                <td>{item.status}</td>
                <td>
                  <Form.Select
                    value={statusUpdates[item.id] || item.status} // Show the selected status or the current one
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    style={{ display: "inline-block", width: "auto", marginRight: "10px" }}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Select>
                  <Button onClick={() => handleSave(item)}>Save</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CensorPage;
