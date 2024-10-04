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




