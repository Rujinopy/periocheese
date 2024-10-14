'use client';

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Toggleform from './Toggleform';
import { Quadrants } from './utils/utils';

interface ToothComponentProps {
    toothNumber: string
    quadrant: Quadrants;
}

const ToothComponent: React.FC<ToothComponentProps> = ({ toothNumber, quadrant }) => {
    const { control } = useFormContext();

    return (
        <div className='text-xs divide-y-2 divide-black w-[47px]'>
            {quadrant.slice(2,) != 'P' && quadrant.slice(2,) != 'L' ? <h3 className='py-1 text-center '>{toothNumber.slice(0, -1)}</h3> : null}

            <div className={`divide-y-2 divide-black flex  ${getFlexClass(quadrant)}`}>
                <div className="flex items-center justify-center ">
                    {[0].map(index => (
                        <Controller
                            key={index}
                            name={`${toothNumber}.mobility.${index}`}
                            control={control}
                            defaultValue="" // Set default value to an empty string or a specific value if needed
                            render={({ field }) => (
                                <select {...field} className="text-center flex justify-center items-center p-0 h-[25px] w-[47px] m-0">
                                    <option value="">-</option>
                                    <option value={1}>I</option>
                                    <option value={2}>II</option>
                                    <option value={3}>III</option>
                                </select>
                            )}
                        />
                    ))}
                </div>
                {/* <label>Implant</label> */}
                <div className="flex divide-x-2 divide-black ">
                    {[0].map(index => (
                        <Toggleform
                            key={index}
                            name={`${toothNumber}.implant.${index}`}
                            onColor='bg-purple-500'
                        />
                    ))}
                </div>
                {/* <label>Furcation</label> */}
                <div className="flex divide-x-2 divide-black ">
                    {[0].map(index => (
                        (toothNumber.slice(1,2).endsWith('6') || toothNumber.slice(1,2).endsWith('7') || toothNumber.slice(1,2).endsWith('8')) ? (
                            <Toggleform
                                key={index}
                                name={`${toothNumber}.furcation.${index}`}
                                onColor='bg-green-500'
                            />

                        ) : <input
                            key={index}
                            type="button"
                            className={`w-full text-center`}
                            disabled

                        />
                    ))}

                </div>
                {/* <label>Bleeding</label> */}
                <div className="flex divide-x-2 divide-black ">
                    {[0, 1, 2].map(index => (
                        <Toggleform
                            key={index}
                            name={`${toothNumber}.bleeding.${index}`}
                            onColor='bg-red-500'
                        />
                    ))}
                </div>
                {/* <label>Plaque</label> */}
                <div className="flex divide-x-2 divide-black ">
                    {[0, 1, 2].map(index => (
                        <Toggleform
                            key={index}
                            name={`${toothNumber}.plaque.${index}`}
                        />
                    ))}
                </div>
                {/* <label>GM </label> */}
                <div className="flex">
                    {(["Q1B", "Q1P", "Q4B", "Q4L"].includes(quadrant) ? [0, 1, 2] : [2, 1, 0]).map(index => (
                        <Controller
                            key={index}
                            name={`${toothNumber}.margin.${index}`}
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <input
                                    type="number"
                                    {...field}
                                    className="w-full text-center py-1"
                                />
                            )}
                        />
                    ))}

                </div>
                <div>
                    {/* <label>PD </label> */}
                    <div className="flex space-x-0">
                        {(["Q1B", "Q1P", "Q4B", "Q4L"].includes(quadrant) ? [0, 1, 2] : [2, 1, 0]).map(index => (
                            <Controller
                                key={index}
                                name={`${toothNumber}.depth.${index}`}
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        {...field}
                                        className="w-full text-center"
                                    />
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToothComponent;


const getFlexClass = (quadrant: Quadrants) => {
    const validFlexCol = ['Q1B', 'Q2B', 'Q3L', 'Q4L'];
    return validFlexCol.includes(quadrant) ? 'flex-col' : 'flex-col-reverse';
};