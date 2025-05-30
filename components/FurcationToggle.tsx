"use client";

import React from "react";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";

interface FurcationToggleProps {
  name: string;
  defaultValue?: number;
  disabled?: boolean;
  width?: string;
}

const FurcationToggle: React.FC<FurcationToggleProps> = ({
  name,
  defaultValue = 0,
  disabled = false,
  width = "w-full",
}) => {
  const { control, watch } = useFormContext();

  // Get base tooth number (e.g., "16" from "16b.furcation.0")
  const baseNumber = name.split(".")[0];

  // Watch implant status for this tooth's buccal side
  const implantValue = watch(`${baseNumber.slice(0, 2)}b.implant.0`) || 0;

  // Combine disabled states - disabled if tooth is absent OR has implant
  const isDisabled = disabled || implantValue === 1;

  const handleToggle = (field: any) => {
    const newValue = (field.value + 1) % 4;
    field.onChange(newValue);
  };

  const renderFurcation = (value: number) => {
    if (value === 0) return null;

    return (
      <div>
        <Image
          src={`/furcation/furcation_${value}.svg`}
          alt={`Furcation Grade ${value}`}
          width={16}
          height={16}
          className="object-contain"
          style={{ width: 11, height: 11 }}
        />
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <button
          type="button"
          onClick={() => !isDisabled && handleToggle(field)}
          disabled={isDisabled}
          className={`h-full flex items-center justify-center ${width}
            ${isDisabled ? "cursor-not-allowed bg-white" : "cursor-pointer bg-white"}`}
        >
          { isDisabled ? null : renderFurcation(field.value)}
        </button>
      )}
    />
  );
};

export default FurcationToggle;