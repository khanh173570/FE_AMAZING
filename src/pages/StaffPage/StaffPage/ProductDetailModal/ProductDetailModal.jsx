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
            // Step 1: Upload the product to the second API link
            await axios.post('https://666a8f987013419182cfc970.mockapi.io/api/example', productDetail);
            
            // Step 2: After successful upload, delete the product from the original MockAPI
            await axios.delete(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${productDetail.id}`);
            
            // Success message
            alert('Sản phẩm đã được tải lên và xóa khỏi MockAPI thành công!');
            
            // Step 3: Close the modal and confirmation popup
            setShowConfirmation(false);
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error uploading or deleting product:', error);
            alert('Có lỗi xảy ra khi tải lên hoặc xóa sản phẩm.');
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
                            <label className='product-info-label'>Nghệ nhân</label>
                            <input type="text" className='readonly-section' value={productDetail.artist} readOnly />
                        </div>
                        <div>
                            <label className='product-info-label'>Gía tiền</label>
                            <input type="text" className='readonly-section' value={`$${productDetail.price}`} readOnly />
                        </div>
                        <div>
                            <label className='product-info-label'>Loại sản phẩm</label>
                            <input type="text" className='readonly-section' value={productDetail.type} readOnly />
                        </div>
                        <div>
                            <label className='product-info-label'>Trạng thái sản phẩm</label>
                            <input type="text" className='readonly-section' value={productDetail.status} readOnly />
                        </div>
                    </div>
                    <div className="product-info-right">
                        <div>
                            <label className='product-info-label'>Chất liệu</label>
                            <input type="text" className='readonly-section' value={productDetail.category} readOnly />
                        </div>
                        <div>
                            <label className='product-info-label'>Mô tả sản phẩm</label>
                            <input type="text" className='readonly-section' value={productDetail.description} readOnly />
                        </div>
                        <div>
                            <label className='product-info-label'>Kích thước sản phẩm</label>
                            <input
                                className='readonly-section'
                                type="text"
                                value={`${productDetail.detail.height} cm (H) x ${productDetail.detail.length} cm (L) x ${productDetail.detail.weight} kg`}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className='product-info-label'>Ngày thêm sản phẩm</label>
                            <input type="text" className='readonly-section' value={productDetail.detail.date} readOnly />
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
