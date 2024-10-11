'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ToothComponent from '@/components/ToothComponent';
import { Kodchasan } from 'next/font/google'
import RecordingButton from '@/components/RecordingButton';
import Periovectors from '@/components/Periovectors';
import { Quadrants } from '@/components/utils/utils';


const kodchasan = Kodchasan({ subsets: ['thai'], weight: ['200', '300', '400', '500', '600'] })

const ChartComponent: React.FC = () => {
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);

    const methods = useForm();
    const { setValue } = methods;

    useEffect(() => {
        if (transcription) {
            try {
                console.log(transcription);
                const dataArray = JSON.parse(transcription);
    
                // Check if the parsed data is an array
                if (Array.isArray(dataArray)) {
                    dataArray.forEach((data) => {
                        // Conditionally set depth if it exists
                        if (data.depth) {
                            setValue(`${data.toothNumber}.depth`, data.depth);
                        }
    
                        // Conditionally set margin if it exists
                        if (data.margin) {
                            setValue(`${data.toothNumber}.margin`, data.margin);
                        }
    
                        // Conditionally set plaque if it exists
                        if (data.plaque) {
                            setValue(`${data.toothNumber}.plaque`, data.plaque);
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
            <div className='bg-orange-300 min-h-[20vh]'>
            </div>
            <div className='fixed top-10 left-4 flex'>
                <RecordingButton
                    setAudioURL={setAudioURL}
                    setTranscription={setTranscription}
                    setLoading={setLoading}
                    loading={loading} // Pass the loading state here
                />
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='mx-auto justify-center items-center w-[1200px] h-[1600px] top-0 left-0'>
                    {/* <h2 className={`${kodchasan.className} bg-yellow-300 font-extrabold text-center py-8 text-4xl z-40`}>ไอ้ต้าวเปอริโอชาร์ท</h2> */}
                    <div className="relative w-full mx-auto ">
                        <svg className='absolute z-10 left-0 top-0 w-[1200px] h-[1600px]'>
                            {['18b', '17b', '16b', '15b', '14b', '13b', '12b', '11b'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q1B}/>
                            ))}
                            {['28b', '27b', '26b', '25b', '24b', '23b', '22b', '21b'].map(tooth => (
                                <Periovectors key={tooth} toothNumber={tooth} quadrant={Quadrants.Q2B}/>
                            ))}
                        </svg>
                        <div className="md:scale-100 transform scale-100 mx-auto"> {/* Adjust scale as needed */}
                            <div className="absolute w-[1200px] h-[1600px] z-20 top-0 left-0">
                                <img
                                    src={"https://www.periodontalchart-online.com/uk/svg/uk-svg_grids-01.svg"}
                                    alt="grid"
                                    width="1200"
                                    height="1600"
                                    className="w-[1200px] h-[1600px]"
                                />

                            </div>
                            <div className="absolute w-[1200px] h-[1600px] z-10 top-0 left-0">
                                <img
                                    src="https://www.periodontalchart-online.com/img/svg/svg_teeth.svg"
                                    width="1200"
                                    height="1600"
                                    className='w-[1200px] h-[1600px]'
                                />
                            </div>
                        </div>
                        {/* Charting Div */}
                        <div className="absolute flex flex-col space-y-10 max-w-[785px] h-auto z-20 md:top-[313px] top-[80px] left-[45px] md:left-[285px] scale-75 md:scale-100">
                            {/* Top Teeth */}
                            <div className='flex space-x-6 bg-white'>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['18b', '17b', '16b', '15b', '14b', '13b', '12b', '11b'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant='Q1B'/>
                                    ))}
                                </div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['21b', '22b', '23b', '24b', '25b', '26b', '27b', '28b'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} quadrant='Q2B'/>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Teeth */}
                            {/* <div className='flex space-x-3'>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['48', '47', '46', '45', '44', '43', '42', '41'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} />
                                    ))}
                                </div>
                                <div className='flex divide-x-2 divide-black border-2 border-black'>
                                    {['31', '32', '33', '34', '35', '36', '37', '38'].map(tooth => (
                                        <ToothComponent key={tooth} toothNumber={tooth} />
                                    ))}
                                </div>
                            </div> */}
                        </div>


                    </div>


                    <button className='z-50 absolute bg-blue-500 text-white p-2 rounded-md bottom-4 right-4' type="submit">
                        Submit
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default ChartComponent;
