import React, { useState, useEffect } from "react";
import { Spinner, Button, Table, Alert, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CensorPages.css";
import { Pagination } from "../../components/Pagination/Pagination.jsx";
import { purple } from "@mui/material/colors";

const CensorPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const uniqueData = Array.from(
          new Set(result.map((item) => item.id))
        ).map((id) => result.find((item) => item.id === id));
        setData(uniqueData);
        setFilteredData(uniqueData);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/censor?page=${pageNumber}`);
  };

  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.includes(searchTerm)
    );
    setFilteredData(results);
    setCurrentPage(1);
  };

  const countStatuses = () => {
    return {
      accepted: data.filter((item) => item.status === "Accepted").length,
      rejected: data.filter((item) => item.status === "Rejected").length,
      other:
        data.length -
        (data.filter((item) => item.status === "Accepted").length +
          data.filter((item) => item.status === "Rejected").length),
    };
  };

  const statusCounts = countStatuses();

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="all-in">
      <div className="row">
        <div className="col-md-6 product">
          <h5 style={{ display: "flex" }}>
            Số sản phẩm Accepted:
            <div
              className="a"
              style={{ marginLeft: "5px", backgroundColor: "green" }}
            >
              {" "}
              {statusCounts.accepted}
            </div>
          </h5>
          <h5 style={{ display: "flex" }}>
            Số sản phẩm Rejected:
            <div
              className="a"
              style={{ marginLeft: "10px", backgroundColor: "red" }}
            >
              {" "}
              {statusCounts.rejected}
            </div>
          </h5>
          <h5 style={{ display: "flex" }}>
            Số sản phẩm khác:
            <div
              className="a"
              style={{ marginLeft: "45px", backgroundColor: "yellow" }}
            >
              {" "}
              {statusCounts.other}
            </div>
          </h5>
        </div>
        <div
          className="col-md-6 search"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm theo tên hoặc danh mục"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "450px", textAlign: "center" }}
            />
            <Button onClick={handleSearch} style={{marginBottom:"20px"}}>
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="border-container">
        <div
          style={{
            backgroundColor: "red",
            textAlign: "center",
            height: "100px",
            lineHeight: "100px",
            color: "white",
            fontSize: "50px",
          }}
        >
          Danh Sách Sản Phẩm Đang Chờ Duyệt
        </div>

        <Table striped bordered hover>
          <thead className="header-row">
            <tr style={{ textAlign: "center" }}>
              <th className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Tên Sản Phẩm
              </th>
              <th  className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Nghệ Nhân
              </th>
              <th  className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Mã Sản Phẩm
              </th>
              <th  className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Giá Trị
              </th>
              <th  className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Phân Loại
              </th>
              <th  className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Trạng Thái
              </th>
              <th  className="tth"
                style={{
                  backgroundColor: "purple",
                  textAlign: "center",
                  width: "250px",
                  color: "white",
                }}
              >
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice(
                (currentPage - 1) * postsPerPage,
                currentPage * postsPerPage
              )
              .map((item) => (
                <tr key={item.id} className="tdd">
                  <td style={{ textAlign: "center", verticalAlign: "middle"}}>{item.name}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{item.artist}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{item.id}</td>
                  <td style={{ textAlign: "center",verticalAlign: "middle" }}>${item.price}</td>
                  <td style={{ textAlign: "center",verticalAlign: "middle" }}>{item.type}</td>
                  <td style={{ textAlign: "center",verticalAlign: "middle" }}>{item.status}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={`/censor/product/${item.id}`}>
                      <Button variant="info" style={{ marginRight: "10px", marginBottom:"20px" }}>
                        Xem Chi Tiết
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredData.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default CensorPage;
