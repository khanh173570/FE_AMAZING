import CryptoJS from "crypto-js";
class VnPayService {
  constructor(vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl) {
    this.vnp_TmnCode = vnp_TmnCode;
    this.vnp_HashSecret = vnp_HashSecret;
    this.vnp_Url = vnp_Url;
    this.vnp_ReturnUrl = vnp_ReturnUrl;
  }

  createPaymentUrl(orderAmount) {
    const date = new Date();
    const vnp_TxnRef = date.getTime().toString(); // Mã giao dịch duy nhất
    const vnp_OrderInfo = "Thanh toán đơn hàng";
    const vnp_Amount = orderAmount * 100; // Tổng số tiền (VND * 100 để chuyển sang đơn vị VNPay)
    const vnp_Locale = "vn";
    const vnp_CurrCode = "VND";
    const vnp_Command = "pay";
    const vnp_OrderType = "billpayment"; // Loại giao dịch
    const vnp_IpAddr = "127.0.0.1"; // IP của người dùng

    const params = {
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Amount,
      vnp_CurrCode,
      vnp_TxnRef,
      vnp_OrderInfo,
      vnp_OrderType,
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr,
      vnp_Command,
      vnp_Locale,
      vnp_CreateDate: date.toISOString().replace(/[-:]/g, "").split(".")[0],
    };

    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {});

    // Tạo chuỗi query
    const query = new URLSearchParams(sortedParams).toString();

    // Ký chuỗi query bằng HMAC SHA-512 với vnp_HashSecret
    const secureHash = CryptoJS.HmacSHA512(query, this.vnp_HashSecret).toString(CryptoJS.enc.Hex);

    // Tạo URL thanh toán
    return `${this.vnp_Url}?${query}&vnp_SecureHash=${secureHash}`;
  }
}

export default VnPayService;
