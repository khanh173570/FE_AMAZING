import React, { useState, useEffect } from "react";
import { Modal, Spinner, Button, Form, Table, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CensorPage.css";

const CensorPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [status, setStatus] = useState("");

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

  const showModal = (record) => {
    setSelectedProduct(record);
    setStatus(record.status);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleSave = () => {
    if (!selectedProduct) return;

    const updatedProduct = {
      ...selectedProduct,
      status,
    };

    fetch(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${selectedProduct.id}`, {
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
          prevData.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item
          )
        );
        handleClose();
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
            <tr style={{textAlign:"center"}}>
              <th style={{backgroundColor:"#CFCFCF"}}>Product Name</th>
              <th  style={{backgroundColor:"#CFCFCF"}}>Artist</th>
              <th  style={{backgroundColor:"#CFCFCF"}}>Product ID</th>
              <th  style={{backgroundColor:"#CFCFCF"}}>Price</th>
              <th  style={{backgroundColor:"#CFCFCF"}}>Type</th>
              <th  style={{backgroundColor:"#CFCFCF"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} onClick={() => showModal(item)} style={{textAlign:"center"}}>
                <td>{item.name}</td>
                <td>{item.artist}</td>
                <td>{item.id}</td>
                <td>${item.price}</td>
                <td>{item.type}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={!!selectedProduct} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <p><b>Name:</b> {selectedProduct.name}</p>
                  <p><b>Artist:</b> {selectedProduct.artist}</p>
                  <p><b>ID:</b> {selectedProduct.id}</p>
                  <p><b>Price:</b> ${selectedProduct.price}</p>
                  <p><b>Type:</b> {selectedProduct.type}</p>
                </div>
                <div style={{ width: "48%" }}>
                  <p><b>Height:</b> {selectedProduct.details.height} cm</p>
                  <p><b>Length:</b> {selectedProduct.details.length} cm</p>
                  <p><b>Weight:</b> {selectedProduct.details.weight} kg</p>
                  <p><b>Date:</b> {selectedProduct.details.date}</p>
                  <Form.Group>
                    <Form.Label><b>Status:</b></Form.Label>
                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CensorPage;
