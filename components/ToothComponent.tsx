'use client';

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Toggleform from './Toggleform';
import { Quadrants, teethStatus } from './utils/utils';

interface ToothComponentProps {
    toothNumber: string;
    quadrant: Quadrants;
    className?: string;
    sections?: {
        mobility?: boolean;
        implant?: boolean;
        furcation?: boolean;
        bleeding?: boolean;
        plaque?: boolean;
        margin?: boolean;
        depth?: boolean;
    };
    sectionOrder?: ('mobility' | 'implant' | 'furcation' | 'bleeding' | 'plaque' | 'margin' | 'depth')[];
}

const ToothComponent: React.FC<ToothComponentProps> = ({ 
    toothNumber, 
    quadrant, 
    sections = {
        mobility: true,
        implant: true,
        furcation: true,
        bleeding: true,
        plaque: true,
        margin: true,
        depth: true
    },
    sectionOrder = ['mobility', 'implant', 'furcation', 'bleeding', 'plaque', 'margin', 'depth']
}) => {
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

    const renderSection = (sectionName: string) => {
        switch(sectionName) {
            case 'mobility':
                return sections.mobility && (
                    <div className="flex items-center justify-center border-black w-[47px]">
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
                );
            case 'implant':
                return sections.implant && (
                    <div className="flex w-[47px]">
                        {[0].map(index => (
                            <Toggleform
                                key={index}
                                name={`${toothNumber}.implant.${index}`}
                                onColor={showBlankFields ? 'bg-white' : 'bg-purple-500'}
                            />
                        ))}
                    </div>
                );
            case 'furcation':
                return sections.furcation && (
                    <div className="flex divide-x-2 divide-black w-[47px] border-t border-black">
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
                );
            case 'bleeding':
                return sections.bleeding && (
                    <div className="flex divide-x-2 divide-black justify-between w-[47px]">
                        {[0, 1, 2].map(index => (
                            <Toggleform
                                key={index}
                                name={`${toothNumber}.bleeding.${index}`}
                                onColor={allTeeth[toothNumber]?.status === 'absent' ? 'bg-white' : 'bg-red-400'}
                            />
                        ))}
                    </div>
                );
            case 'plaque':
                return sections.plaque && (
                    <div className="flex divide-x-2 divide-black w-[47px]">
                        {[0, 1, 2].map(index => (
                            <Toggleform
                                key={index}
                                name={`${toothNumber}.plaque.${index}`}
                                onColor={allTeeth[toothNumber]?.status === 'absent' ? 'bg-white' : 'bg-yellow-400'} // Example color for plaque
                            />
                        ))}
                    </div>
                );
            case 'margin':
                return sections.margin && (
                    <div className="flex w-[47px]">
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
                );
            case 'depth':
                return sections.depth && (
                    <div>
                        <div className="flex space-x-0 w-[47px]">
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
                );
            default:
                return null;
        }
    };

    return (
        <div className={`text-xs divide-y-2 divide-black w-[378/8 px] h-[162/8 px]` } >

            {quadrant.slice(2) !== 'P' && quadrant.slice(2) !== 'L' && 
             (toothNumber.startsWith('1') || toothNumber.startsWith('2')) ? (
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


            <div className={`divide-y-2  divide-black flex ${getFlexClass(quadrant)}`}>
                {sectionOrder.map((section) => renderSection(section))}
            </div>

            {quadrant.slice(2) !== 'P' && quadrant.slice(2) !== 'L' && 
             (toothNumber.startsWith('3') || toothNumber.startsWith('4')) ? (
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
        </div>
    );
};

export default ToothComponent;

const getFlexClass = (quadrant: Quadrants) => {
    const validFlexCol = ['Q1B', 'Q2B', 'Q3L', 'Q4L'];
    return validFlexCol.includes(quadrant) ? 'flex-col' : 'flex-col-reverse';
};
