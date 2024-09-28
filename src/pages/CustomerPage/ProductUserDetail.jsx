import React, { useState } from 'react';
import './ProductUserDetail.scss';
import thumbnailImg from '/assets/assetsCustomer/2502a7794963e0d44366ac7db3c641f1.webp';
import thumbnailImg1 from '/assets/assetsCustomer/đfdfdf.jpg';
import thumbnailImg2 from '/assets/assetsCustomer/di-lac-dung-bao-tien-go-huong-da-cao-50-1-300x400.jpg';
import thumbnailImg3 from '/assets/assetsCustomer/talalal.jpg';
import sanphamkhac1 from '/assets/assetsCustomer/Screenshot 2024-09-24 170931.png';
import sanphamkhac2 from '/assets/assetsCustomer/taaall-967x800.jpg';
import sanphamkhac3 from '/assets/assetsCustomer/514.png';

const ProductUserDetail = () => {
    let currentImageIndex = 0;
    const images = [
        thumbnailImg,
        thumbnailImg1,
        thumbnailImg2,
        thumbnailImg3
    ];
    function showImage(index) {
        const mainThumbnail = document.getElementById('main-thumbnail');
        mainThumbnail.src = images[index];
    }
    function previousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = images.length - 1;
        }
        showImage(currentImageIndex);
    }
    function nextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        showImage(currentImageIndex);
    }
    const [activeTab, setActiveTab] = useState('details');
    const [quantity, setQuantity] = useState(1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    const [selectedColor, setSelectedColor] = useState(null);
    const colors = ['gray', 'orange', 'yellow'];

    return (
        <div className="product-container">
            <div className="product-headContainer">
                <div className="product-gallery">
                    <div className="thumbnail-images">
                        <img src={thumbnailImg} alt="Thumbnail 1" className="thumbnail-small" />
                        <img src={thumbnailImg1} alt="Thumbnail 2" className="thumbnail-small" />
                        <img src={thumbnailImg2} alt="Thumbnail 3" className="thumbnail-small" />
                        <img src={thumbnailImg3} alt="Thumbnail 4" className="thumbnail-small" />
                    </div>
                    <button className="arrow left-arrow" onClick={previousImage}>&#10094;</button>
                    <img id="main-thumbnail" src={thumbnailImg} alt="Main Product" className="thumbnail-large" />
                    <button className="arrow right-arrow" onClick={nextImage}>&#10095;</button>
                </div>
                <div className="product-content">
                    <div className="title-price-container">
                        <h1 className="product-title">Đồ cổ</h1>
                        <p className="product-price">3.200.000 VND</p>
                    </div>
                    {/* <div className="product-rating">
                        <span>★★★★★</span>
                        <a href="#">50 lượt đánh giá</a>
                    </div> */}
                    <p className="product-description">
                        Cổ tay cầm phải và cổ 1 ghế ngồi riêng, được làm từ bông và vải coton đem lại cảm giác
                        rất thoải mái khi ngồi và nằm.
                    </p>
                    {/* <div className="product-options">
                        <label>Màu sắc: </label>
                        <div className="color-options">
                            {colors.map((color) => (
                                <div
                                    key={color}
                                    className={`color-box ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                ></div>
                            ))}
                        </div>
                    </div> */}
                    <div className="quantity">
                        <label>Số lượng:</label>
                        <div className="quantity-controls">
                            <button className="quantity-btn" onClick={decreaseQuantity}>-</button> {/* Giảm số lượng */}
                            <input type="number" value={quantity} readOnly min="1" /> {/* Hiển thị số lượng và khóa chỉnh sửa */}
                            <button className="quantity-btn" onClick={increaseQuantity}>+</button> {/* Tăng số lượng */}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="top-buttons">
                            <button className="buy-now">Mua Ngay</button>
                            <button className="add-to-cart">Thêm Vào Giỏ Hàng</button>
                        </div>
                        <button className="call-support">
                            <span>Gọi tư vấn</span><br />
                            <span>(chúng tôi luôn hỗ trợ 24/7)</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="product-details-container">
                <div className="tab-buttons">
                    <button
                        className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Thông số chi tiết
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Mô tả
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'details' && (
                        <div className="details-content">
                            <div className="details-columns">
                                <table className="details-table">
                                    <tbody>
                                        <tr>
                                            <td className="attribute highlighted">Chiều dài:</td>
                                            <td className="value">259 cm</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute highlighted">Chiều rộng:</td>
                                            <td className="value">175 cm</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute highlighted">Chiều cao:</td>
                                            <td className="value">80 cm</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Chiều sâu:</td>
                                            <td className="value">60 cm</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Chiều cao chân:</td>
                                            <td className="value">5 cm</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute highlighted">Cân nặng:</td>
                                            <td className="value">95 kg</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Tổng thể:</td>
                                            <td className="value">259x175x60/80</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="description-table">
                                    <tbody>
                                        <tr>
                                            <td className="attribute">Chất liệu:</td>
                                            <td className="value">Vải mát</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Kiểu dáng:</td>
                                            <td className="value">Kiểu đứng ngang</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Tổng hợp:</td>
                                            <td className="value">3 ghế, 3 gối</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Chiều sâu:</td>
                                            <td className="value">60/80</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute">Thành phần khác:</td>
                                            <td className="value">20% cotton</td>
                                        </tr>
                                        <tr>
                                            <td className="attribute highlighted">Mã sản phẩm:</td>
                                            <td className="value">22u3dsdfh</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'description' && (
                        <div className="description-content">
                            <img src={thumbnailImg} alt="Product" className="product-image" />
                            <p className="image-caption">Đồ gỗ mỹ nghệ: Tượng phật Di Lặc</p>
                            <p className="product-description">
                                Đây là một sản phẩm với chất lượng tuyệt vời, kiểu dáng sang trọng, thích hợp cho mọi không gian nội thất.
                                Sản phẩm này được chế tác từ những vật liệu tốt nhất, đảm bảo độ bền và tính thẩm mỹ cao. Với thiết kế
                                hiện đại nhưng vẫn giữ được sự thanh lịch, sản phẩm mang lại sự hài hòa cho mọi không gian phòng khách,
                                phòng ngủ, hay bất kỳ không gian nào bạn muốn tạo điểm nhấn.
                            </p>
                        </div>

                    )}
                </div>
            </div>

            <RelatedProducts />
        </div>
    );
};

const RelatedProducts = () => {
    return (
        <div className="related-products">
            <h3>Sản phẩm khác</h3>
            <div className="related-item">
                <img src={sanphamkhac1} alt="Related Product 1" />
                <div className='itemsp'>
                    <p>Đồ cổ</p>
                    <p>4.500.000 VND</p>
                </div>
            </div>
            <div className="related-item">
                <img src={sanphamkhac2} alt="Related Product 2" />
                <div className='itemsp'>
                    <p>Đồ cổ</p>
                    <p>5.000.000 VND</p>
                </div>
            </div>
            <div className="related-item">
                <img src={sanphamkhac3} alt="Related Product 3" />
                <div className='itemsp'>
                    <p>Đồ cổ</p>
                    <p>3.700.000 VND</p>
                </div>
            </div>
        </div>
    );
};

export default ProductUserDetail;
