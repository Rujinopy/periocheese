import React from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { toothData } from './utils/utils';

const FurcationOverlay = () => {
  const { watch } = useFormContext();
  
  // Watch all furcation values for re-renders
  const watchAllFields = watch();

  return (
    <div className="absolute z-[40] top-0 left-0 w-full h-full">
      {toothData.map((tooth) => {
        if (!tooth.furcation) return null;

        const implantValue = watchAllFields?.[`${tooth.toothNumber.slice(0, 2)}b`]?.implant?.[0] || 0;
        const isAbsent = watchAllFields?.[tooth.toothNumber]?.status === 'absent';

        // Skip if tooth has implant or is absent
        if (implantValue === 1 || isAbsent) return null;

        return tooth.furcation.map((pos, index) => {
          // Get the furcation value from the watched fields
          const furcationValue = watchAllFields?.[tooth.toothNumber]?.furcation?.[index] || 0;
          
          // Skip rendering if furcation value is 0
          if (furcationValue === 0) return null;

          return (
            <div
              key={`${tooth.toothNumber}-furcation-${index}`}
              className="absolute"
              style={{
                left: `${pos.left}px`,
                top: `${pos.top}px`,
              }}
            >
              <Image
                src={`/furcation/furcation_${furcationValue}.svg`}
                alt={`Furcation Grade ${furcationValue}`}
                width={16}
                height={16}
                className="object-contain"
                style={{ width: 15, height: 15 }}
              />
            </div>
          );
        });
      })}
    </div>
  );
};

export default FurcationOverlay;