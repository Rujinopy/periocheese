'use client';

import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ToggleButtonProps {
  name: string;
  defaultValue?: number;
  onColor?: string;
  offColor?: string;
}

const Toggleform: React.FC<ToggleButtonProps> = ({ name, defaultValue = 0, onColor = 'bg-yellow-500', offColor = 'bg-white' }) => {
  const { control } = useFormContext();
  const [toggled, setToggled] = useState(defaultValue === 1);

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
          className={`w-full text-center ${field.value === 1 ? onColor : offColor} hover:cursor-pointer`}
          onClick={() => handleToggle(field)}
        />
      )}
    />
  );
};

export default Toggleform;
