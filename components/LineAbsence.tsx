'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { toothData, Quadrants } from '@/components/utils/utils';

interface ToothComponentProps {
  toothNumber: string;
  quadrant?: Quadrants;
}

const LineAbsence: React.FC<ToothComponentProps> = ({ toothNumber }) => {
  const { watch } = useFormContext();
  const status = watch(`${toothNumber}.status`) || 'present';
  const toothInfo = toothData.find(tooth => tooth.toothNumber.toString() === toothNumber);
  const left = toothInfo?.absenceLine?.left || 0;  // Default to 0 if undefined
  const top = toothInfo?.absenceLine?.top || 0;    // Default to 0 if undefined

  return (
    <div
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      className="absolute z-30 pointer-events-none"
    >
     {status === "absent" ?
      <img
        src='/chart/line.svg'
        alt='Line Absence'
        className=''
      /> : null }
    </div>
  );
};

export default LineAbsence;
