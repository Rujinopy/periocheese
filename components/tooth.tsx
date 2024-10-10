"use client"

import React, { useState } from 'react';

type ToggleState = 'yes' | 'no';

interface InputBoxProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

const InputBox: React.FC<InputBoxProps> = ({ label, value, onChange, min, max }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mb-1">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    if (!isNaN(newValue) && (min === undefined || newValue >= min) && (max === undefined || newValue <= max)) {
                        onChange(newValue);
                    }
                }}
                className="border rounded p-2 w-full"
                min={min}
                max={max}
            />
        </div>
    );
};

interface ToggleBoxProps {
    label: string;
    value: ToggleState;
    onToggle: () => void;
}

const ToggleBox: React.FC<ToggleBoxProps> = ({ label, value, onToggle }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mb-1">{label}</label>
            <div
                className={`border rounded p-2 cursor-pointer w-full text-center ${value === 'yes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={onToggle}
            >
                {value.toUpperCase()}
            </div>
        </div>
    );
};

interface MultiToggleBoxProps {
    label: string;
    values: ToggleState[];
    onToggle: (index: number) => void;
    yesColor?: string;
    noColor?: string;
}

const MultiToggleBox: React.FC<MultiToggleBoxProps> = ({ label, values, onToggle, yesColor = 'bg-red-500', noColor = 'bg-gray-200' }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mb-1">{label}</label>
            <div className="flex space-x-2">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className={`border rounded p-2 cursor-pointer w-1/3 text-center ${value === 'yes' ? yesColor : noColor}`}
                        onClick={() => onToggle(index)}
                    >
                        {value === 'yes' ? 'Yes' : 'No'}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Tooth: React.FC = () => {
    const [mobility, setMobility] = useState(0);
    const [implant, setImplant] = useState<ToggleState>('no');
    const [furcation, setFurcation] = useState(0);
    const [bleedingOnProbe, setBleedingOnProbe] = useState<ToggleState[]>(['no', 'no', 'no']);
    const [plaque, setPlaque] = useState<ToggleState[]>(['no', 'no', 'no']);
    const [gingivalMargin, setGingivalMargin] = useState([0, 0, 0]);
    const [pocketDepth, setPocketDepth] = useState([0, 0, 0]);

    const handleMultiToggle = (setter: React.Dispatch<React.SetStateAction<ToggleState[]>>, index: number) => {
        setter((prev) => {
            const newValues = [...prev];
            newValues[index] = newValues[index] === 'yes' ? 'no' : 'yes';
            return newValues;
        });
    };

    return (
        <div className="p-4 space-y-4">
            <InputBox label="Mobility" value={mobility} onChange={setMobility} min={0} max={3} />
            <ToggleBox label="Implant" value={implant} onToggle={() => setImplant(implant === 'yes' ? 'no' : 'yes')} />
            <InputBox label="Furcation" value={furcation} onChange={setFurcation} min={0} max={3} />
            <MultiToggleBox label="Bleeding on Probe" values={bleedingOnProbe} onToggle={(index) => handleMultiToggle(setBleedingOnProbe, index)} yesColor="bg-red-500" />
            <MultiToggleBox label="Plaque" values={plaque} onToggle={(index) => handleMultiToggle(setPlaque, index)} yesColor="bg-yellow-500" />
            <div className="space-y-2">
                <label className="text-sm font-medium">Gingival Margin</label>
                <div className='flex'>
                    {['Distobuccal', 'Buccal', 'Mesiobuccal'].map((label, index) => (
                        <InputBox
                            key={index}
                            label={label}
                            value={gingivalMargin[index]}
                            onChange={(value) => {
                                const newValues = [...gingivalMargin];
                                newValues[index] = value;
                                setGingivalMargin(newValues);
                            }}
                            min={-20}
                            max={20}
                        />
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Pocket Depth</label>
                <div className='flex'>
                    {['Distobuccal', 'Buccal', 'Mesiobuccal'].map((label, index) => (
                        <InputBox
                            key={index}
                            label={label}
                            value={pocketDepth[index]}
                            onChange={(value) => {
                                const newValues = [...pocketDepth];
                                newValues[index] = value;
                                setPocketDepth(newValues);
                            }}
                            min={-20}
                            max={20}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tooth;
