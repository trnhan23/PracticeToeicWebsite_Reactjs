import React, { useState } from "react";
import "./Popup.scss";
import { toast } from "react-toastify";
import { createTopic } from "../../services/topicService";

const TopicPopup = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });

    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const checkValidation = () => {
        let validationErrors = {};
        if (!formData.title.trim()) {
            validationErrors.title = "Tiêu đề không được để trống.";
        }
        if (!formData.image) {
            validationErrors.image = "Hình ảnh không được để trống.";
        }
        return validationErrors;
    };

    const handleChange = (event, field) => {
        if (field === "image") {
            setFormData({ ...formData, image: event.target.files[0] });
        } else {
            setFormData({ ...formData, [field]: event.target.value });
        }
    };

    const handleSave = async () => {
        const validationErrors = checkValidation();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                let res = await createTopic(formData.title, formData.image);
                if (res && res.errCode === 0) {
                    toast.success("Tạo chủ đề mới thành công!");
                    setFormData({ title: "", image: null });
                    onSave();
                    onClose();
                } else {
                    toast.error(`Tạo chủ đề thất bại: ${res?.data?.message || "Lỗi không xác định"}`);
                }
            } catch (error) {
                toast.error("Không thể kết nối API");
            }
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
                        value={formData.title}
                        onChange={(event) => handleChange(event, "title")}
                        placeholder="Nhập tiêu đề"
                        className={errors.title ? "input-error" : ""}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label>Hình ảnh</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleChange(event, "image")}
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
