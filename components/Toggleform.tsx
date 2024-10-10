'use client';

import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ToggleButtonProps {
  name: string;
  defaultValue?: number;
  onColor?: string;
  offColor?: string;
}

const Toggleform: React.FC<ToggleButtonProps> = ({ name, defaultValue = 0, onColor = 'bg-yellow-500', offColor = 'bg-gray-300' }) => {
  const { control } = useFormContext();
  const [toggled, setToggled] = useState(defaultValue === 1);

  const handleToggle = (field: any) => {
    const newValue = !toggled ? 1 : 0;
    setToggled(!toggled);
    field.onChange(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (

          <input
            type="button"
            className={`w-full text-center  ${toggled ? onColor : offColor} hover:cursor-pointer`}
            onClick={() => handleToggle(field)}
          />

      )}
    />
  );
};

export default Toggleform;
