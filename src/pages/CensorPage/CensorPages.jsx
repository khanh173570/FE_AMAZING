import React, { useState, useEffect } from "react";
import { Spinner, Button, Table, Alert, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CensorPages.css";
import { Pagination } from "../../components/Pagination/Pagination.jsx";

const CensorPage = () => {
  const [data, setData] = useState([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const postsPerPage = 5; // Số sản phẩm mỗi trang
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm
  const [filteredData, setFilteredData] = useState([]); // State cho dữ liệu đã lọc
  const navigate = useNavigate(); // Khởi tạo navigate
  const location = useLocation(); // Khởi tạo location để lấy URL

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
        setFilteredData(uniqueData); // Khởi tạo filteredData với toàn bộ dữ liệu
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Gọi hàm fetchData
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/censor?page=${pageNumber}`); // Cập nhật URL
  };

  // Tìm kiếm sản phẩm theo ID hoặc Tên
  const handleSearch = () => {
    const results = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.category.includes(searchTerm)
    );
    setFilteredData(results);
    setCurrentPage(1); // Đặt lại trang hiện tại về 1
  };

  // Đếm số lượng trạng thái
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
          <h5 style={{ display: "flex"}}>
            Số sản phẩm Accepted:
            <div className="a" style={{marginLeft:"5px", backgroundColor:"green"}}> {statusCounts.accepted}</div>
          </h5>
          <h5 style={{ display: "flex" }}>
            Số sản phẩm Rejected:
            <div className="a" style={{marginLeft:"10px", backgroundColor:"red"}}> {statusCounts.rejected}</div>
          </h5>
          <h5 style={{ display: "flex"}}>
            Số sản phẩm khác:
            <div className="a" style={{marginLeft:"45px", backgroundColor:"yellow"}}> {statusCounts.other}</div>
          </h5>
        </div>
        <div
          className="col-md-6 search"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên hoặc danh mục"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: "10px", width: "450px", textAlign: "center" }} // Thêm khoảng cách bên phải
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <div className="border-container">
        <div className="title">Danh Sách Sản Phẩm Đang Chờ Duyệt</div>
        <Table striped bordered hover>
          <thead className="header-row">
            <tr style={{ textAlign: "center" }}>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>
                Tên Sản Phẩm
              </th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>
                Nghệ Nhân
              </th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>
                Mã Sản Phẩm
              </th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>
                Giá Trị
              </th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>
                Phân Loại
              </th>
              <th style={{ backgroundColor: "#CFCFCF", textAlign: "center" }}>
                Trạng Thái
              </th>
              <th
                style={{
                  backgroundColor: "#CFCFCF",
                  textAlign: "center",
                  width: "250px",
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
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{item.name}</td>
                  <td style={{ textAlign: "center" }}>{item.artist}</td>
                  <td style={{ textAlign: "center" }}>{item.id}</td>
                  <td style={{ textAlign: "center" }}>${item.price}</td>
                  <td style={{ textAlign: "center" }}>{item.type}</td>
                  <td style={{ textAlign: "center" }}>{item.status}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={`/censor/product/${item.id}`}>
                      <Button variant="info" style={{ marginRight: "10px" }}>
                      Xem Chi Tiết
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Thêm phân trang */}
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
