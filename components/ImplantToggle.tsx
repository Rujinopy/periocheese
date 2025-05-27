"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";

interface ImplantToggleProps {
  name: string;
  defaultValue?: number;
  disabled?: boolean;
}

const ImplantToggle: React.FC<ImplantToggleProps> = ({
  name,
  defaultValue = 0,
  disabled = false,
}) => {
  const { control, setValue, watch, getValues } = useFormContext();

  const handleToggle = (field: any) => {
  const newValue = field.value === 1 ? 0 : 1;
  field.onChange(newValue);

  // Get the base number (first two chars, e.g. "11" from "11b.implant.0")
  const baseNumber = name.slice(0, 2);
  // Possible suffixes for tooth positions
  const suffixes = ["b", "l", "p"];

  suffixes.forEach((suffix) => {
    const fieldName = `${baseNumber}${suffix}.implant.0`;
    if (fieldName !== name) {
      setValue(fieldName, newValue);
    }
  });
};

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <button
          type="button"
          className="w-full h-full flex items-center justify-center"
          onClick={() => handleToggle(field)}
          disabled={disabled}
        >
          {field.value === 1 && (
            <Image
              src="/implants/implant.svg"
              alt="Implant"
              width={10}
              height={10}
              className="object-contain"
              style={{ width: 10, height: 10 }} // Ensure it scales properly
            />
          )}
        </button>
      )}
    />
  );
};

export default ImplantToggle;
