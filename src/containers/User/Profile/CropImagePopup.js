import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './CropImagePopup.scss';
const CropImagePopup = ({ image, onCrop, onClose }) => {
    const cropperRef = useRef(null);

    const handleSave = () => {
        const cropper = cropperRef.current.cropper;
        const croppedCanvas = cropper.getCroppedCanvas({
            width: 308,
            height: 308,
        });
        const croppedImage = croppedCanvas.toDataURL();
        onCrop(croppedImage);
        onClose();
    };

    return (
        <div className="crop-popup-overlay">
            <div className="crop-popup">
                <h3>Crop Image</h3>
                <Cropper
                    src={image}
                    style={{ height: 400, width: '100%' }}
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                />
                <div className="crop-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CropImagePopup;
