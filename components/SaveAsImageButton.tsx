"use client"; // Interacting with the DOM

import html2canvas from "html2canvas";

interface SaveAsImageButtonProps {
  formRef: React.RefObject<HTMLFormElement>;
}

const SaveAsImageButton: React.FC<SaveAsImageButtonProps> = ({ formRef }) => {
  const handleSaveImage = async () => {
    if (formRef.current) {
      try {
        const canvas = await html2canvas(formRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "form-image.png";
        link.click();
      } catch (error) {
        console.error("Failed to save image:", error);
      }
    }
  };

  return (
    <button onClick={handleSaveImage} className="">
      Save Chart as Image
    </button>
    //style backup
    // rounded-lg ml-5 text-black bg-[#FFDE59] border-2 border-black px-4 p-1 h-fit my-auto hover:scale-105 hover:bg-[#ffeaba] transition-all duration-200 ease-in-out shadow-[0px_0px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]
  );
};

export default SaveAsImageButton;
