import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductEdit.css'

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    type: '',
  });

  useEffect(() => {
    axios
      .get(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${id}`, product);
      alert("Product updated successfully!");
      navigate('/staff'); // Navigate back to the product table page after saving
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className='editstaff'>
      <h1>Sửa sản phẩm {id}</h1>
      <hr />
      <form onSubmit={handleSubmit} className='edit-form'>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            readOnly // Restricts editing
          />
        </div>
        <div>
          <label>Mô tả sản phẩm</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-form-row">
          <div>
            <label htmlFor="type">Gía thành sản phẩm</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Chất liệu sản phẩm</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              readOnly // Restricts editing
            />
          </div>
        </div>
        <div>
          <label>Loại:</label>
          <input
            type="text"
            name="type"
            value={product.type}
            onChange={handleChange}
            readOnly // Restricts editing
          />
        </div>
        <div className="edit-form-button-container">
          <button type="submit">Lưu sản phẩm</button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
