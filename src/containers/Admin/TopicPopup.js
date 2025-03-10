import React, { useState } from "react";
import "./Popup.scss";
import { toast } from "react-toastify";
import { createNewTopic } from "../../services/topicService";

const TopicPopup = ({ isOpen, onClose, onSave, formData, onChange }) => {
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const checkValidation = () => {
        let validationErrors = {};

        if (!formData.title) {
            validationErrors.title = "Tiêu đề không được để trống.";
        }

        if (!formData.image) {
            validationErrors.image = "Hình ảnh không được để trống.";
        }

        return validationErrors;
    };

    const handleSave = async () => {
        const validationErrors = checkValidation();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Dữ liệu gửi lên API:", formData);
            let res = await handleCreateTopic(formData);

            console.log("API Response:", res); // Log để kiểm tra dữ liệu API trả về

            // Kiểm tra thành công dựa vào `success` thay vì `errCode`
            if (res && res.success) {
                toast.success("Tạo chủ đề mới thành công!");
                onSave(); // Gọi callback để cập nhật danh sách
                onClose(); // Đóng modal sau khi lưu thành công
            } else {
                toast.error(`Tạo chủ đề thất bại: ${res?.message || "Lỗi không xác định"}`);
            }
        }
    };


    const handleCreateTopic = async (formData) => {
        try {
            let data = await createNewTopic({
                title: formData.title,
                image: formData.image
            });

            console.log("API response:", data);
            return data;
        } catch (error) {
            console.error("Lỗi tạo chủ đề:", error.response ? error.response.data : error);
            toast.error(`Lỗi: ${error.response?.data?.message || "Không thể kết nối API"}`);
            return null;
        }
    };



    return (
        <div className="popup-container">
            <div className="popup-content">
                <h3>Thêm chủ đề mới</h3>

                <div className="form-group">
                    <label>Tiêu đề</label>
                    <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(event) => onChange(event, "title")}
                        placeholder="Nhập tiêu đề"
                        className={errors.title ? "input-error" : ""}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label>Hình ảnh (URL)</label>
                    <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(event) => onChange(event, "image")}
                        placeholder="Nhập URL hình ảnh"
                        className={errors.image ? "input-error" : ""}
                    />
                    {errors.image && <span className="error-text">{errors.image}</span>}
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

export default TopicPopup;