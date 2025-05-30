import { useFormContext, useWatch } from "react-hook-form";
import { toothData } from "@/components/utils/utils";
import Image from "next/image";
import { useEffect } from "react";

interface ImplantImageProps {
  toothNumber: string;
}

const ImplantImage: React.FC<ImplantImageProps> = ({ toothNumber }) => {
  const { control, setValue } = useFormContext();
  const baseNumber = toothNumber.slice(0, -1);
  const position = toothNumber.slice(-1);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('periodontal-chart-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const implantValue = parsedData?.[toothNumber]?.implant?.[0];
        if (implantValue !== undefined) {
          setValue(`${toothNumber}.implant.0`, implantValue);
        }
      }
    }
  }, [toothNumber, setValue]);

  // Watch the implant toggle value
  const implantValue = useWatch({
    control,
    name: `${toothNumber}.implant.0`,
    defaultValue: 0,
  });

  // Watch the tooth status
  const toothStatus = useWatch({
    control,
    name: `${toothNumber}.status`,
    defaultValue: "present",
  });

  if (implantValue !== 1 || toothStatus === "absent") {
    return null;
  }

  const imgSrc = `/implants/${baseNumber[0]}/${baseNumber}${position}.png`;

  // Get position styles based on tooth data
  const tooth = toothData.find((t) => t.toothNumber === toothNumber);
  if (!tooth?.absenceLine) return null;

  return (
    <div
      className="absolute z-[15] pointer-events-none"
      style={{
        left: `${tooth.implantLayout?.left}px`,
        top: `${tooth.implantLayout?.top}px`,
        width: `${tooth.implantLayout?.width}px`,
        height: `${tooth.implantLayout?.height}px`,
        zIndex: 15,
      }}
    >
      <Image
        src={imgSrc}
        alt={`Implant ${toothNumber}`}
        width={tooth.implantLayout?.width || 60}
        height={tooth.implantLayout?.height || 137}
        className="object-contain z-[15]"
        style={{ width: tooth.implantLayout?.width, height: tooth.implantLayout?.height }}
      />
    </div>
  );
};

export default ImplantImage;