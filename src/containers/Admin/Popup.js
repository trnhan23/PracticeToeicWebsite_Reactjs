import React, { useState } from "react";
import "./Popup.scss";
import { validateAlphabetic, validateEmail, validatePassword } from "../../validation/Validated";
import { createNewUserService } from "../../services/userService";
import { ROLE, SIGNUP } from '../../utils';
import { toast } from "react-toastify";


const Popup = ({ isOpen, onClose, onSave, formData, onChange }) => {
    const [errors, setErrors] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    if (!isOpen) return null;

    const checkValidation = () => {
        let validationErrors = {};

        if (!formData.email) {
            validationErrors.email = "Email không được để trống.";
        } else if (!validateEmail(formData.email)) {
            validationErrors.email = "Email không hợp lệ.";
        }

        if (!formData.password) {
            validationErrors.password = "Mật khẩu không được để trống.";
        } else {
            const passwordError = validatePassword(formData.password);
            if (passwordError) {
                validationErrors.password = passwordError;
            }
        }

        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = "Nhập lại mật khẩu không được để trống.";
        } else if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "Mật khẩu không khớp.";
        }

        if (!formData.fullName) {
            validationErrors.fullName = "Họ tên không được để trống.";
        } else if (!validateAlphabetic(formData.fullName)) {
            validationErrors.fullName = "Họ tên chỉ được chứa chữ cái.";
        }

        return validationErrors;
    };

    const hanldeShowHidePassword = (data) => {
        if (data === SIGNUP.PW) {
            setIsShowPassword(!isShowPassword);
        }
        else {
            setIsShowConfirmPassword(!isShowConfirmPassword);
        }
    }

    const handleSave = async () => {
        const validationErrors = checkValidation();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            let res = await handleRegisterUser(formData)
            if (res && res.errCode === 0) {
                toast.success("Tạo người dùng mới thành công");
                onSave();
            } else {
                toast.error("Tạo người dùng mới thất bại");
            }
        }
    };

    const handleRegisterUser = async (formData) => {
        try {
            let data = await createNewUserService({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                avatar: 'https://i.pravatar.cc/300?img=2',
                roleId: ROLE.User
            });

            return data;
        } catch (error) {
            if (error.response) {
                console.log("Lỗi");
            }
        }
    }

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h3>Thêm người dùng mới</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(event) => onChange(event, "email")}
                        placeholder="Nhập email"
                        className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <div className="custom-input-password">
                        <input
                            type={isShowPassword ? "text" : "password"}
                            value={formData.password || ''}
                            onChange={(event) => onChange(event, "password")}
                            placeholder="Nhập mật khẩu"
                            className={errors.password ? "input-error" : ""}
                        />
                        <span onClick={() => { hanldeShowHidePassword(SIGNUP.PW) }}>
                            <i className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                        </span>
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <div className="custom-input-password">
                        <input
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword || ''}
                            onChange={(event) => onChange(event, "confirmPassword")}
                            placeholder="Nhập lại mật khẩu"
                            className={errors.confirmPassword ? "input-error" : ""}
                        />
                        <span onClick={() => { hanldeShowHidePassword(SIGNUP.CP) }}>
                            <i className={isShowConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                        </span>
                    </div>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="form-group">
                    <label>Họ tên</label>
                    <input
                        type="text"
                        value={formData.fullName || ''}
                        onChange={(event) => onChange(event, "fullName")}
                        placeholder="Nhập tên"
                        className={errors.fullName ? "input-error" : ""}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="popup-footer">
                    <button className="btn btn-success" onClick={handleSave}>
                        Lưu
                    </button>
                    <button className="btn btn-secondary" onClick={onClose}>
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
