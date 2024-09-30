import React, { useState, useEffect } from 'react';
import './ProductDetailModal.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductDetailModal = ({ productId, onClose }) => {
    const [productDetail, setProductDetail] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // For the confirmation pop-up

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

    const handleUploadClick = () => {
        setShowConfirmation(true); // Show the confirmation pop-up
    };

    const handleConfirmUpload = async () => {
        try {
            await axios.post('https://666a8f987013419182cfc970.mockapi.io/api/example', productDetail);
            alert("Sản phẩm đã được tải lên thành công!");
            setShowConfirmation(false); // Close the confirmation pop-up
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Failed to upload product.");
        }
    };

    const handleCancelUpload = () => {
        setShowConfirmation(false); // Close the confirmation pop-up without uploading
    };

    if (!productDetail) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="tabbar">
                    <h3>Chi tiết sản phẩm</h3>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <img src={productDetail.img} alt={productDetail.name} />
                <h2>{productDetail.name}</h2>
                <div className="product-info">
                    <div className="product-info-left">
                        <div>
                            <label>Nghệ nhân</label>
                            <input type="text" value={productDetail.artist} readOnly />
                        </div>
                        <div>
                            <label>Gía tiền</label>
                            <input type="text" value={`$${productDetail.price}`} readOnly />
                        </div>
                        <div>
                            <label>Loại sản phẩm</label>
                            <input type="text" value={productDetail.type} readOnly />
                        </div>
                        <div>
                            <label>Trạng thái sản phẩm</label>
                            <input type="text" value={productDetail.status} readOnly />
                        </div>
                    </div>
                    <div className="product-info-right">
                        <div>
                            <label>Chất liệu</label>
                            <input type="text" value={productDetail.category} readOnly />
                        </div>
                        <div>
                            <label>Mô tả sản phẩm</label>
                            <input type="text" value={productDetail.description} readOnly />
                        </div>
                        <div>
                            <label>Kích thước sản phẩm</label>
                            <input
                                type="text"
                                value={`${productDetail.detail.height} cm (H) x ${productDetail.detail.length} cm (L) x ${productDetail.detail.weight} kg`}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Ngày thêm sản phẩm</label>
                            <input type="text" value={productDetail.detail.date} readOnly />
                        </div>
                    </div>
                </div>

                {/* Upload and Edit buttons */}
                <div className="modal-buttons">
                    <button onClick={handleUploadClick}>Upload</button>
                    <button className='edit-button'>
                        <Link to={`/staff/editproduct/${productDetail.id}`}>
                            Edit
                        </Link></button>
                </div>

                {/* Confirmation Pop-up */}
                {showConfirmation && (                   
                    <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <h3>Xác nhận</h3>
                        <p>Bạn có chắc chắn muốn tải lên sản phẩm này không?</p>
                        <button onClick={handleConfirmUpload}>Xác nhận</button>
                        <button onClick={handleCancelUpload}>Hủy</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailModal;
