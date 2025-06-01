'use client';

import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ToggleButtonProps {
  name: string;
  defaultValue?: number;
  onColor?: string;
  offColor?: string;
  disabled?: boolean;
}

const Toggleform: React.FC<ToggleButtonProps> = ({ name, defaultValue = 0, onColor = 'bg-yellow-500', offColor = 'bg-white', disabled= false }) => {
  const { control } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toggled, setToggled] = useState(defaultValue === 1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (field: any) => {
    const newValue = field.value === 1 ? 0 : 1;
    setToggled(newValue === 1); // Update toggle state based on new value
    field.onChange(newValue);
  };

  useEffect(() => {
    // Sync state with form value changes, useful if form values are controlled elsewhere
    setToggled(defaultValue === 1);
  }, [defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <input
          type="button"
          disabled={disabled}
          className={`w-full text-center ${field.value === 1 ? onColor : offColor} ${disabled ? null : "hover:cursor-pointer" }`}
          onClick={() => handleToggle(field)}
        />
      )}
    />
  );
};

export default Toggleform;
