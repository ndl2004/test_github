import { URL } from 'react-native-url-polyfill';  // Giúp xử lý query string trên các phiên bản cũ của React Native
import CryptoJS from 'crypto-js';
import moment from 'moment';

// Cấu hình thông tin VNPAY của bạn
const config = {
    vnp_TmnCode: 'PIBIVWUB',  // Mã website tại VNPAY
    vnp_HashSecret: 'JD9DMEV5HQM996H11B2N8JQNL9NOCH9M',  // Chuỗi bí mật để tạo chữ ký
    vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',  // URL sandbox hoặc production
    vnp_ReturnUrl: 'http://localhost:8000/vnpay_return',  // URL callback sau khi thanh toán
};

// Hàm tạo URL thanh toán cho VNPAY
export const createPaymentUrl = (amount, orderId) => {
    if (!amount || amount <= 0) {
        throw new Error('Số tiền không hợp lệ. Số tiền phải lớn hơn 0.');
    }

    const createDate = moment().format('YYYYMMDDHHmmss');  // Thời gian tạo giao dịch

    // Thông tin thanh toán gửi lên VNPAY
    const params = {
        vnp_Version: '2.1.0',  // Phiên bản API
        vnp_Command: 'pay',  // Lệnh giao dịch
        vnp_TmnCode: config.vnp_TmnCode,  // Mã website tại VNPAY
        vnp_Amount: amount * 100,  // Chuyển số tiền thành đồng (yêu cầu nhân với 100)
        vnp_CurrCode: 'VND',  // Loại tiền (VNĐ)
        vnp_TxnRef: orderId || `${new Date().getTime()}`,  // Mã giao dịch duy nhất
        vnp_OrderInfo: `Thanh toán đơn hàng #${orderId || 'Không xác định'}`,  // Thông tin đơn hàng
        vnp_ReturnUrl: config.vnp_ReturnUrl,  // URL callback sau khi thanh toán
        vnp_IpAddr: '10.17.15.154',  // Địa chỉ IP của người dùng (có thể lấy từ props hoặc context)
        vnp_CreateDate: createDate,  // Thời gian tạo giao dịch
        vnp_Locale: 'vn',  // Ngôn ngữ (vn cho tiếng Việt, en cho tiếng Anh)
    };

    // Sắp xếp các tham số theo thứ tự bảng chữ cái
    const sortedParams = sortObject(params);

    // Tạo chuỗi query string từ các tham số đã sắp xếp
    const queryString = new URLSearchParams(sortedParams).toString();

    // Tạo chữ ký bảo mật sử dụng HmacSHA512 với chuỗi query string và HashSecret
    const secureHash = CryptoJS.HmacSHA512(queryString, config.vnp_HashSecret).toString();

    // Tạo URL thanh toán cuối cùng
    const paymentUrl = `${config.vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`;

    return paymentUrl;
};

// Hàm sắp xếp các object theo key (VNPAY yêu cầu sắp xếp params trước khi tạo chữ ký)
const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
};
