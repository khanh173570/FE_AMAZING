import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailHome.css";

const ProductDetailHome = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://666a8f987013419182cfc970.mockapi.io/api/example/${id}`
        );
        const result = await response.json();
        setProduct(result);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {/* Left Column - Product Image */}
        <div className="col-md-6" style={{ marginBottom: "20px" }}>
          <div
            className="image-containe"
            style={{ height: "400px", textAlign: "center", marginTop:"10%" }}
          >
            <img
              src={product.img}
              alt={product.name}
              className="product-image"
              style={{ maxHeight: "400px", width: "auto", height: "auto" }}
            />
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="col-md-6">
          <h2 className="title">{product.name}</h2>
          <table className="k table-bordered table-responsive">
            <tbody>
              <tr>
                <td className="p">
                  <strong>Nghệ nhân:</strong>
                </td>
                <td className="t">{product.artist}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Giá trị:</strong>
                </td>
                <td className="t">${product.price}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Phân loại:</strong>
                </td>
                <td className="t">{product.type}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Danh mục:</strong>
                </td>
                <td className="t">{product.category}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Số lượng:</strong>
                </td>
                <td className="t">{product.quantity}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Chiều cao:</strong>
                </td>
                <td className="t">{product.detail.height} cm</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Khối lượng:</strong>
                </td>
                <td className="t">{product.detail.weight} kg</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Chiều dài:</strong>
                </td>
                <td className="t">{product.detail.length} cm</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Ngày sản xuất:</strong>
                </td>
                <td className="t">{product.detail.date}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Mã sản phẩm:</strong>
                </td>
                <td className="t">{product.detail.idProduct}</td>
              </tr>
              <tr>
                <td className="p">
                  <strong>Mô tả:</strong>
                </td>
                <td className="t">{product.description}</td>
              </tr>
            </tbody>
          </table>
          <Link
            to="#"
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            Xem sản phẩm khác
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHome;
