import React, { useState, useEffect } from "react";
import { Spinner, Button, Table, Alert } from "react-bootstrap";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Link } from "react-router-dom"; // Import Link for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "./CensorPages.css";

const CensorPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSave = (item) => {
    // Logic for saving status can be added here if needed in the future
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "Status update functionality has been removed.",
      confirmButtonText: "OK",
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
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>Product Name</th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>Artist</th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>Product ID</th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>Price</th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>Type</th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>Status</th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center", width: "250PX" }}>
                Action
              </th>
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
                  <Link to={`/censor/product/${item.id}`}>
                    <Button variant="info" style={{ marginRight: '10px' }}>Details</Button>
                  </Link>
                 
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
