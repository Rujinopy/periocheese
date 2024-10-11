import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { toothData, Mode, Quadrants } from '@/components/utils/utils'


interface PeriovectorsProps {
        toothNumber: string;
        quadrant: Quadrants;
}

const Periovectors: React.FC<PeriovectorsProps> = ({ toothNumber, quadrant }) => {
        const { watch } = useFormContext();
        const pocketDepth = watch(`${toothNumber}.depth`) || [0, 0, 0]; // Watch pocket depth values
        const gingivalMargin = watch(`${toothNumber}.margin`) || [0, 0, 0]; // Watch gingival margin values

        // Find the xCoords for the given toothNumber
        const toothInfo = toothData.find(tooth => tooth.toothNumber.toString() === toothNumber);
        const xCoords = toothInfo ? toothInfo.xCoords : [];
        const xinterCoords = toothInfo ? toothInfo.xinterCoords : [];

        // Example function to adjust SVG points based on pocket depth and margin
        const calculatePoints = (mode: Mode) => {

                // if(quadrant === Quadrants.Q1B || )
                if (mode === "GM") {
                        return xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = 585 + parseInt(gingivalMargin[index]) * 6.5
                                return `${x},${y}`;
                        }).join(' ');
                }

                if (mode === "CAL") {
                        return xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = 585 + ((parseFloat(gingivalMargin[index]) * 6.5) - (parseFloat(pocketDepth[index]) * 6.5))
                                return `${x},${y}`;
                        }).join(' ');
                }

                if (mode === "PD") {
                        let CAL_Line = xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = 585 + ((parseFloat(gingivalMargin[index]) * 6.5) - (parseFloat(pocketDepth[index]) * 6.5))
                                return `${x},${y}`;
                        }).join(' ');

                        let GM_Line = xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = 585 + parseInt(gingivalMargin[index]) * 6.5
                                return `${x},${y}`;
                        }).toReversed().join(' ');

                        return CAL_Line + " " + GM_Line
                }
        };



        const calculateInterPoints = (mode: Mode) => {
                const sideoftooth = toothNumber.slice(2,)
                //use GM from mesial of tooth number and use distal from another
                const nextToothNumber = String(extractNumericPart(toothNumber) - 1)+ sideoftooth; // Decrement the numeric part
                const nextPocketDepth = watch(`${nextToothNumber}.depth`) || [0, 0, 0]; // Watch pocket depth values
                const nextGingivalMargin = watch(`${nextToothNumber}.margin`) || [0, 0, 0]; // Watch gingival margin values
                
                if (mode === "GM") {
                        return xinterCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                if (index === 0) {
                                        const y = 585 + parseInt(gingivalMargin[2]) * 6.5
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = 585 + parseInt(nextGingivalMargin[0]) * 6.5
                                        return `${x},${y}`;
                                }
                        }).join(' ');
                }

                if (mode === "CAL") {
                        return xinterCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                if (index === 0) {
                                        const y = 585 + ((parseFloat(gingivalMargin[2]) * 6.5) - (parseFloat(pocketDepth[2]) * 6.5))
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = 585 + ((parseFloat(nextGingivalMargin[0]) * 6.5) - (parseFloat(nextPocketDepth[0]) * 6.5))
                                        return `${x},${y}`;
                                }
                        }).join(' ');
                }

                if (mode === "PD") {
                        let CAL_Line = xinterCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                if (index === 0) {
                                        const y = 585 + ((parseFloat(gingivalMargin[2]) * 6.5) - (parseFloat(pocketDepth[2]) * 6.5))
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = 585 + ((parseFloat(nextGingivalMargin[0]) * 6.5) - (parseFloat(nextPocketDepth[0]) * 6.5))
                                        return `${x},${y}`;
                                }
                        }).join(' ');

                        let GM_Line = xinterCoords.map((x, index) => {
                                if (index === 0) {
                                        const y = 585 + parseInt(gingivalMargin[2]) * 6.5
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = 585 + parseInt(nextGingivalMargin[0]) * 6.5
                                        return `${x},${y}`;
                                }
                        }).toReversed().join(' ');

                        return CAL_Line + " " + GM_Line
                }
        };

        return (
                <>
                        <polygon className="pocket" points={calculatePoints(Mode.PD)} ></polygon>
                        <polyline className="attachment_level" points={calculatePoints(Mode.CAL)}  ></polyline>
                        <polyline className="gingival_margin" points={calculatePoints(Mode.GM)}  ></polyline>
                        {
                                !arraysEqual(xinterCoords, [0, 0]) ?
                                        <>
                                                <polygon className="pocket" points={calculateInterPoints(Mode.PD)} ></polygon>
                                                <polyline className="attachment_level" points={calculateInterPoints(Mode.CAL)}  ></polyline>
                                                <polyline className="gingival_margin" points={calculateInterPoints(Mode.GM)}  ></polyline>
                                        </> : null
                        }
                </>
        );
};

export default Periovectors;


function arraysEqual(a: number[], b: number[]): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return false;
        }
        return true;
}


const extractNumericPart = (toothNumber: string): number => {
        const match = toothNumber.match(/\d+/);  // Extract numeric part of the string
        return match ? parseInt(match[0]) : 0;   // If found, convert to number, otherwise return 0
};