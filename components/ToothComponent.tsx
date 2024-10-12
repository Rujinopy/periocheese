'use client';

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Toggleform from './Toggleform';

interface ToothComponentProps {
    toothNumber: string
    quadrant: string;
}

const ToothComponent: React.FC<ToothComponentProps> = ({ toothNumber, quadrant }) => {
    const { control } = useFormContext();

    return (
        <div className='text-xs divide-y-2 divide-black w-[47px]'>
            { quadrant.slice(2,) != 'P' && quadrant.slice(2,) != 'L' ?  <h3 className='py-1 text-center '>{toothNumber.slice(0, -1)}</h3> : null }

            <div className={`divide-y-2 divide-black flex  ${ quadrant.slice(2,) != 'P' && quadrant.slice(2,) != 'L' ? "flex-col" : "flex-col-reverse" }`}>
                <div className="flex">
                    {[0].map(index => (
                        <Controller
                            key={index}
                            name={`${toothNumber}.mobility.${index}`}
                            control={control}
                            defaultValue="" // Set default value to an empty string or a specific value if needed
                            render={({ field }) => (
                                <select {...field} className="w-full text-center">
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
                        (toothNumber.endsWith('6') || toothNumber.endsWith('7') || toothNumber.endsWith('8')) ? (
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
                    {(["Q1B", "Q1P"].includes(quadrant) ? [0, 1, 2] : [2, 1, 0]).map(index => (
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
                        {(["Q1B", "Q1P"].includes(quadrant) ? [0, 1, 2] : [2, 1, 0]).map(index => (
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


                        {/* {['mesial', 'buccal', 'distal'].map(index => (
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
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToothComponent;
