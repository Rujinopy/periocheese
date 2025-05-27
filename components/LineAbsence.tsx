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
  const left = toothInfo?.absenceLine?.left || 0;
  const top = toothInfo?.absenceLine?.top || 0;

  return (
    <div
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: '20px',  // Give minimum width
        height: '2px', // Give minimum height
        zIndex: 40  // Add explicit z-index
      }}
      className="absolute pointer-events-none" // Add background for debugging
    >
      {status === "absent" && (
        <img
          src='/chart/line.svg'
          alt='Line Absence'
          className='z-50'
        />
      )}
    </div>
  );
};

export default LineAbsence;