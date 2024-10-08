//hàm kiểm tra chỉ cho nhập chữ tiếng việt
export const validateAlphabetic = (input) => {
    const regex = /^[\p{L}\s]*$/u;
    return regex.test(input);
}

//hàm kiểm tra định dạng email
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// hàm kiểm tra password
export const validatePassword = (password) => {

    const hasLowercase = /[a-z]/.test(password);  // Kiểm tra có ít nhất 1 chữ thường
    const hasUppercase = /[A-Z]/.test(password);  // Kiểm tra có ít nhất 1 chữ hoa
    const hasNumber = /\d/.test(password);        // Kiểm tra có ít nhất 1 số
    const hasSpecialChar = /[\W_]/.test(password);// Kiểm tra có ít nhất 1 ký tự đặc biệt
    const isValidLength = password.length >= 8;   // Kiểm tra độ dài ít nhất 8 ký tự

    // Xử lý thông báo lỗi dựa trên các điều kiện không thỏa mãn
    if (!isValidLength) {
        return 'Password must be at least 8 characters long.';
    }

    if (!hasLowercase) {
        return 'Password must contain at least 1 lowercase letter.';
    }

    if (!hasUppercase) {
        return 'Password must contain at least 1 uppercase letter.';
    }

    if (!hasNumber) {
        return 'Password must contain at least 1 number.';
    }

    if (!hasSpecialChar) {
        return 'Password must contain at least 1 special character.';
    }

    return '';
};




