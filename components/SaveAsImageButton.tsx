'use client'; // Interacting with the DOM

import html2canvas from 'html2canvas';
import { useRef } from 'react';

interface SaveAsImageButtonProps {
  formRef: React.RefObject<HTMLFormElement>;
}

const SaveAsImageButton: React.FC<SaveAsImageButtonProps> = ({ formRef }) => {
  const handleSaveImage = async () => {
    if (formRef.current) {
      try {
        const canvas = await html2canvas(formRef.current);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'form-image.png';
        link.click();
      } catch (error) {
        console.error('Failed to save image:', error);
      }
    }
  };

  return (
    <button
      onClick={handleSaveImage}
      className="mt-4 bg-green-500 text-white px-4 py-2"
    >
      Save as Image
    </button>
  );
};

export default SaveAsImageButton;
