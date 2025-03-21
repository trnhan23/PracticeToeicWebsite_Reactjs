import React, { useState, useEffect } from "react";
import "./TopicPopup.scss";
import { toast } from "react-toastify";
import { createTopic, updateTopic } from "../../services/topicService";

const TopicPopup = ({ isOpen, onClose, onSave, editTopic }) => {
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editTopic) {
            setFormData({
                title: editTopic.title || "", // Đảm bảo không undefined
                image: editTopic.image || null,
            });

            if (editTopic.image) {
                setPreviewImage(editTopic.image);
            } else {
                setPreviewImage(null);
            }
        } else {
            setFormData({ title: "", image: null });
            setPreviewImage(null);
        }
    }, [editTopic]);

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
            const file = event.target.files[0];
            if (file) {
                setFormData({ ...formData, image: file });

                // Hiển thị ảnh xem trước
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);
            }
        } else {
            setFormData({ ...formData, [field]: event.target.value });
        }
    };

    const handleSave = async () => {
        const validationErrors = checkValidation();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                let res;
                if (editTopic) {
                    res = await updateTopic(editTopic.id, formData.title, formData.image);
                } else {
                    res = await createTopic(formData.title, formData.image);
                }

                if (res && res.errCode === 0) {
                    toast.success(`${editTopic ? "Cập nhật" : "Tạo"} chủ đề thành công!`);
                    setFormData({ title: "", image: null });
                    setPreviewImage(null);
                    onSave();
                    onClose();
                } else {
                    toast.error(`${editTopic ? "Cập nhật" : "Tạo"} thất bại: ${res?.data?.message || "Lỗi không xác định"}`);
                }
            } catch (error) {
                toast.error("Không thể kết nối API");
            }
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h3>{editTopic ? "Cập nhật chủ đề" : "Thêm chủ đề mới"}</h3>

                <div className="form-group">
                    <label>Tiêu đề</label>
                    <input
                        type="text"
                        value={formData.title || ""} // Đảm bảo không undefined
                        onChange={(event) => handleChange(event, "title")}
                        placeholder="Nhập tiêu đề"
                        className={errors.title ? "input-error" : ""}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label>Hình ảnh</label>
                    <input type="file" accept="image/*" onChange={(event) => handleChange(event, "image")} />
                    {errors.image && <span className="error-text">{errors.image}</span>}

                    {previewImage && (
                        <div className="image-preview">
                            <img src={previewImage} alt="Xem trước hình ảnh" />
                        </div>
                    )}
                </div>

                <div className="popup-footer">
                    <button className="btn btn-success" onClick={handleSave}>
                        {editTopic ? "Cập nhật" : "Lưu"}
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
