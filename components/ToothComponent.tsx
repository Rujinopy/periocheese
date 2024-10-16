'use client';

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Toggleform from './Toggleform';
import { Quadrants, teethStatus } from './utils/utils';

interface ToothComponentProps {
    toothNumber: string;
    quadrant: Quadrants;
}

const ToothComponent: React.FC<ToothComponentProps> = ({ toothNumber, quadrant }) => {
    const { control, setValue, watch } = useFormContext();
    const [showBlankFields, setShowBlankFields] = useState(false);
    const toothPrefix = toothNumber.slice(0, -1);
    const allTeeth = watch(); // Watch all fields

    const handleToggleBlankFields = () => {
        // Toggle all fields that start with the same tooth number (prefix)
        Object.keys(allTeeth).forEach((key) => {
            if (key.startsWith(toothPrefix)) {
                const currentValue = allTeeth[key]?.status || 'present';  // Default to 'present' if status doesn't exist
                setValue(`${key}.status`, currentValue === 'present' ? 'absent' : 'present');
            }
        });        
    };

    return (
        <div className='text-xs divide-y-2 divide-black w-[47px] relative'>

            {quadrant.slice(2) !== 'P' && quadrant.slice(2) !== 'L' ? (
                <Controller
                    name={`${toothNumber}.status`}
                    control={control}
                    defaultValue="present"
                    render={({ field }) => (
                        <h3
                            onClick={() => {
                                handleToggleBlankFields();
                                field.onChange(field.value === 'present' ? 'absent' : 'present');
                            }}
                            className='py-1 text-center cursor-pointer'
                        >
                            {toothNumber.slice(0, -1)}
                        </h3>
                    )}
                />
            ) : null}


            <div className={`divide-y-2 divide-black flex ${getFlexClass(quadrant)}`}>
                <div className="flex items-center justify-center">
                    {[0].map(index => (
                        <Controller
                            key={index}
                            name={`${toothNumber}.mobility.${index}`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className={`text-center flex justify-center items-center p-0 w-[47px] m-0 ${allTeeth[toothNumber]?.status === 'absent' ? 'bg-white text-white' : ''}`}
                                >
                                    <option value="">-</option>
                                    <option value={"1"}>I</option>
                                    <option value={"2"}>II</option>
                                    <option value={"3"}>III</option>
                                </select>
                            )}
                        />
                    ))}
                </div>

                <div className="flex divide-x-2 divide-black">
                    {[0].map(index => (
                        <Toggleform
                            key={index}
                            name={`${toothNumber}.implant.${index}`}
                            onColor={showBlankFields ? 'bg-white' : 'bg-purple-500'}
                        />
                    ))}
                </div>

                <div className="flex divide-x-2 divide-black">
                    {[0].map(index => (
                        (toothNumber.slice(1, 2).endsWith('6') || toothNumber.slice(1, 2).endsWith('7') || toothNumber.slice(1, 2).endsWith('8')) ? (
                            <Toggleform
                                key={index}
                                name={`${toothNumber}.furcation.${index}`}
                                onColor={allTeeth[toothNumber]?.status === 'absent' ? 'bg-white' : 'bg-green-500'}
                            />
                        ) : <input key={index} type="button" className={`w-full text-center bg-black`} disabled />
                    ))}
                </div>

                <div className="flex divide-x-2 divide-black justify-between">
                    {[0, 1, 2].map(index => (
                        <Toggleform
                            key={index}
                            name={`${toothNumber}.bleeding.${index}`}
                            onColor={allTeeth[toothNumber]?.status === 'absent' ? 'bg-white' : 'bg-red-400'}
                        />
                    ))}
                </div>

                <div className="flex divide-x-2 divide-black">
                    {[0, 1, 2].map(index => (
                        <Toggleform
                            key={index}
                            name={`${toothNumber}.plaque.${index}`}
                            onColor={allTeeth[toothNumber]?.status === 'absent' ? 'bg-white' : 'bg-yellow-400'} // Example color for plaque
                        />
                    ))}
                </div>

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
                                    className={`w-full text-center flex justify-center items-center py-1 ${allTeeth[toothNumber]?.status === 'absent' ? 'bg-white text-white' : ''}`}
                                />
                            )}
                        />
                    ))}
                </div>

                <div>
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
                                        className={`w-full text-center ${allTeeth[toothNumber]?.status === 'absent' ? 'bg-white text-white' : ''}`}
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
