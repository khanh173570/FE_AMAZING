import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProductDetailHome.css'; // Ensure to create this CSS file for styling

const ProductDetailHome = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`);
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
        <div className="col-md-6" style={{marginBottom:"20px"}}>
          <img src={product.img} alt={product.name} className="product-image" />
        </div>
        {/* Right Column - Product Details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <div className="row">
            {/* Left Column of Details */}
            <div className="col-md-6">
              <p><strong>Nghệ nhân:</strong> {product.artist}</p>
              <p><strong>Giá trị:</strong> ${product.price}</p>
              <p><strong>Phân loại:</strong> {product.type}</p>
              <p><strong>Danh mục:</strong> {product.category}</p>
              <p><strong>Số lượng:</strong> {product.quantity}</p>
              <Link to="#" onClick={() => window.history.back()} >
            Xem sản phẩm khác
          </Link>
            </div>
            {/* Right Column of Details */}
            <div className="col-md-6">
              <p>Chiều cao: <strong>{product.detail.height} cm</strong></p>
              <p>Khối lượng: <strong>{product.detail.weight} kg</strong></p>
              <p>Chiều dài: <strong>{product.detail.length} cm</strong></p>
              <p>Ngày sản xuất: <strong>{product.detail.date}</strong></p>
              <p>Mã sản phẩm: <strong>{product.detail.idProduct}</strong></p>
              <p>Mô tả: <strong>{product.description}</strong></p>
            </div>
          </div>
         
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHome;
