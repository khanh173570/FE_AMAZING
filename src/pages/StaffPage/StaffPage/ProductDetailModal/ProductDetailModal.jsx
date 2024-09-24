import React, { useState, useEffect } from 'react';
import './ProductDetailModal.css';
import axios from 'axios';

const ProductDetailModal = ({ productId, onClose }) => {
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${productId}`);
                setProductDetail(response.data);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        if (productId) {
            fetchProductDetail();
        }
    }, [productId]);

    if (!productDetail) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{productDetail.name}</h2>
                <img src={productDetail.img} alt={productDetail.name} />
                <p><strong>Nghệ nhân</strong> {productDetail.artist}</p>
                <p><strong>Gía tiền:</strong> ${productDetail.price}</p>
                <p><strong>Loại sản phẩm:</strong> {productDetail.type}</p>
                <p><strong>Trạng thái sản phẩm:</strong> {productDetail.status}</p>
                <p><strong>Chất liệu:</strong> {productDetail.category}</p>
                <p><strong>Mô tả sản phẩm:</strong> {productDetail.description}</p>
                <p><strong>Kích thước sản phẩm:</strong> {productDetail.detail.height} cm (H) x {productDetail.detail.length} cm (L) x {productDetail.detail.weight} kg</p>
                <p><strong>Ngày thêm sản phẩm:</strong> {productDetail.detail.date}</p>
            </div>
        </div>
    );
};

export default ProductDetailModal;
