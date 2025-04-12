// src/hooks/Cloudinary.js
import { useState } from 'react';

const Cloudinary = () => {
    const preset_name = "ml_default";
    const cloud_name = "ddltlpsy1";

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (file) => {
        setSelectedFile(file);
        setMessage('');
        setImage('');
    };

    const uploadImage = async () => {
        if (!selectedFile) {
            setMessage("❌ Por favor selecciona una imagen antes de subir.");
            return;
        }

        const data = new FormData();
        data.append('file', selectedFile);
        data.append('upload_preset', preset_name);
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.secure_url) {
                setImage(result.secure_url);
                setMessage('✅ Imagen subida exitosamente');
            } else {
                setMessage('❌ Error al subir la imagen');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setMessage('❌ Ocurrió un error durante la subida');
            setLoading(false);
        }
    };

    return {
        image,
        loading,
        message,
        handleFileChange,
        uploadImage,
    };
};

export default Cloudinary;
