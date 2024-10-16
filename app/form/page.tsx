'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ToothComponent from '@/components/ToothComponent';
import { Kodchasan } from 'next/font/google'
import RecordingButton from '@/components/RecordingButton';
import Periovectors from '@/components/Periovectors';
import { Quadrants, toothData } from '@/components/utils/utils';
import SaveAsImageButton from '@/components/SaveAsImageButton'; // Import the button
import LineAbsence from '@/components/LineAbsence';

const kodchasan = Kodchasan({ subsets: ['thai'], weight: ['200', '300', '400', '500', '600'] })

const ChartComponent: React.FC = () => {
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null); // Reference to the form container

    const methods = useForm();
    const { setValue, watch } = methods;

    useEffect(() => {
        if (transcription) {
            try {
                console.log(transcription);
                const dataArray = JSON.parse(transcription);

                // Check if the parsed data is an array
                if (Array.isArray(dataArray)) {
                    dataArray.forEach((data) => {
                        const quadrant = data.toothNumber.slice(0, 1)
                        // Conditionally set depth if it exists
                        if (data.depth) {
                            if (quadrant === '1' || quadrant === '4') {
                                setValue(`${data.toothNumber}.depth`, data.depth);
                            }
                            else {
                                setValue(`${data.toothNumber}.depth`, data.depth.toReversed());
                            }
                        }

                        // Conditionally set margin if it exists
                        if (data.margin) {
                            if (quadrant === '1' || quadrant === '4') {
                                setValue(`${data.toothNumber}.margin`, data.margin);
                            }
                            else {
                                setValue(`${data.toothNumber}.margin`, data.margin.toReversed());
                            }
                        }

                        // Conditionally set plaque if it exists
                        if (data.plaque) {
                            setValue(`${data.toothNumber}.plaque`, data.plaque);
                        }
                        // Conditionally set plaque if it exists
                        if (data.bleeding) {
                            setValue(`${data.toothNumber}.bleeding`, data.bleeding);
                        }

                        if (data.mobility) {
                            setValue(`${data.toothNumber}.mobility`, data.mobility);
                        }

                    });
                } else {
                    console.error("Expected an array but received something else");
                }
            } catch (error) {
                console.error("Error parsing transcription or setting values:", error);
            }
        }
    }, [setValue, transcription]);


    const onSubmit = (data: any) => {
        console.log('Submitted Data:', data);
    };

    return (
        <div>
            <div className='bg-yellow-300 min-h-[20vh] flex items-center justify-center' >
                <h2 className={`${kodchasan.className} bg-yellow-300 font-extrabold text-center py-8 text-6xl z-40`}>Periocheese :D</h2>
            </div>
            <div className='fixed top-[220px] left-[700px] flex z-50'>
                <RecordingButton
                    setAudioURL={setAudioURL}
                    setTranscription={setTranscription}
                    setLoading={setLoading}
                    loading={loading} // Pass the loading state here
                />
                <SaveAsImageButton formRef={formRef} />

            </div>
            <FormProvider {...methods} >
                <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)} className='mx-auto justify-center items-center w-[1200px] h-[1600px] top-0 left-0'>
                    {/* <button className='z-50  bg-blue-500 text-white p-2 rounded-md bottom-10 right-4' type="submit">
                        Submit
                    </button> */}
                    <div className="relative w-full mx-auto " >
                        <svg className='absolute z-10 left-0 top-0 w-[1200px] h-[1600px] ' >

                            {['18b', '17b', '16b', '15b', '14b', '13b', '12b', '11b'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q1B} />
                            ))}
                            {['28b', '27b', '26b', '25b', '24b', '23b', '22b', '21b'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q2B} />
                            ))}
                            {['18p', '17p', '16p', '15p', '14p', '13p', '12p', '11p'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q1P} />
                            ))}
                            {['28p', '27p', '26p', '25p', '24p', '23p', '22p', '21p'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q2P} />
                            ))}
                            {['38b', '37b', '36b', '35b', '34b', '33b', '32b', '31b'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q3B} />
                            ))}
                            {['38l', '37l', '36l', '35l', '34l', '33l', '32l', '31l'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q3L} />
                            ))}
                            {['41b', '42b', '43b', '44b', '45b', '46b', '47b', '48b'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q4B} />
                            ))}
                            {['41l', '42l', '43l', '44l', '45l', '46l', '47l', '48l'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q4L} />
                            ))}
                        </svg>
                        <div className="md:scale-100 transform scale-100 mx-auto">

                            {toothData.map((data, index)=> (
                                data?.absenceLine ? (
                                    <LineAbsence key={index} toothNumber={data.toothNumber} />
                                ) : null
                            ))}

                            <div className="absolute w-[1200px] h-[1600px] z-20 top-0 left-0">
                                <img
                                    src={`/grid/uk-svg_grids-01.svg`}
                                    alt="grid"
                                    width="1200"
                                    height="1600"
                                    className="w-[1200px] h-[1600px] z-31"
                                />

                            </div>
                            <div className="absolute w-[1200px] h-[1600px] z-10 top-0 left-0">
                                <img
                                    src={`/grid/svg_teeth.svg`}
                                    width="1200"
                                    height="1600"
                                    className='w-[1200px] h-[1600px]'
                                />
                            </div>
                        </div>
                        {/* Charting Div */}
                        <div className="absolute flex flex-col space-y-10 max-w-[785px] h-auto z-20 md:top-[313px] top-[80px] left-[45px] md:left-[285px] scale-75 md:scale-100">
                            {/* Top Teeth */}
                            <div className='flex space-x-8 bg-white absolute' >

                                <div className='flex divide-x-2 divide-black border border-black'>
                                    {['18b', '17b', '16b', '15b', '14b', '13b', '12b', '11b'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q1B} />
                                    ))}
                                </div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['21b', '22b', '23b', '24b', '25b', '26b', '27b', '28b'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q2B} />
                                    ))}
                                </div>
                            </div>
                            <div className='flex space-x-9 bg-white absolute top-[28.2rem] -left-10 h-auto'>
                                <div className='h-full bg-white absolute z-50 top-0 -left-20 w-[90px]'>
                                </div>
                                {/* <div className='h-full bg-white absolute z-50 top-0 -right-20 w-[80px]'> </div> */}
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['18p', '17p', '16p', '15p', '14p', '13p', '12p', '11p'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q1P} />
                                    ))}
                                </div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['21p', '22p', '23p', '24p', '25p', '26p', '27p', '28p'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q2P} />
                                    ))}
                                </div>
                            </div>
                            <div className='flex space-x-8 bg-white absolute  top-[1065px] -left-10 h-auto' >
                                <div className='h-full bg-white absolute z-50 top-0 -left-20 w-[90px]'></div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['48b', '47b', '46b', '45b', '44b', '43b', '42b', '41b'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q4B} />
                                    ))}
                                </div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['31b', '32b', '33b', '34b', '35b', '36b', '37b', '38b'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q3B} />
                                    ))}
                                </div>

                            </div>
                            <div className='flex space-x-8 bg-white absolute top-[600px]' >
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['48l', '47l', '46l', '45l', '44l', '43l', '42l', '41l'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q4L} />
                                    ))}
                                </div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['31l', '32l', '33l', '34l', '35l', '36l', '37l', '38l'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant={Quadrants.Q3L} />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default ChartComponent;
