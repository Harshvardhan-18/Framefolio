import React, { useRef, useState } from 'react';
import { CropperPreview, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'; // Import cropper styles
import "./Template2.css"

const Template2 = () => {
    const cropperRef = useRef(null);
    const [src, setSrc] = useState(null); // State for uploaded image
    const [croppedImage, setCroppedImage] = useState(null);
    const [isEditing,setIsEditing]= useState(null);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSrc(reader.result); // Set the uploaded image as source
                setCroppedImage(null);
                setIsEditing(true);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    // Handle cropping confirmation
    const handleCropConfirm = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCanvas(); // Extract cropped area as a canvas
            if (canvas) {
                setCroppedImage(canvas.toDataURL());
                setIsEditing(false); 
            }
        }
    };
    const handleEdit = () => {
      setIsEditing(true); // Enable editing mode
  };

    return (
        <div className="template2-container">
            <h1>Upload and Crop Image</h1>

            {/* Upload input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input"
            />

            {/* Display Cropper only if an image is uploaded */}
            {src && isEditing && (
                <div>
                    <Cropper
                        ref={cropperRef}
                        className="cropper max-h-[30vw] max-w-[30vw] "
                        stencilProps={{ aspectRatio: 1 }}
                        src={src}
                    />
                    <button onClick={handleCropConfirm} className="confirm-button">
                        Confirm Crop
                    </button>
                </div>
            )}

            {/* Display the cropped image */}
            {croppedImage && !isEditing && (
                <div>
                    <h2>Cropped Image</h2>
                    <img src={croppedImage} alt="Cropped Result" className="cropped-result max-h-[30vw] max-w-[30vw]" />
                    <button onClick={handleEdit} className="edit-button">
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Template2;
