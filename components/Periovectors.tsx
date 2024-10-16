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
        const dontswappedQuadrant = ["Q1B", "Q2B", "Q4L", "Q3L"]
        const status = watch(`${toothNumber}.status`) || 'present';
        // Find the xCoords for the given toothNumber
        const toothInfo = toothData.find(tooth => tooth.toothNumber.toString() === toothNumber);
        const xCoords = toothInfo ? toothInfo.xCoords : [];
        const xinterCoords = toothInfo ? toothInfo.xinterCoords : [];
        const sideoftooth = toothNumber.slice(2,)
        let yValue = 585

        if (quadrant === Quadrants.Q1P || quadrant === Quadrants.Q2P) {
                yValue = 694
        }

        if (quadrant === Quadrants.Q3B || quadrant === Quadrants.Q4B) {
                yValue = 1310
        }

        if (quadrant === Quadrants.Q3L || quadrant === Quadrants.Q4L) {
                yValue = 1195
        }


        // Example function to adjust SVG points based on pocket depth and margin
        const calculatePoints = (mode: Mode) => {

                if (mode === "GM") {
                        return xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = dontswappedQuadrant.includes(quadrant) ?
                                        yValue + parseInt(gingivalMargin[index]) * 6.5
                                        :
                                        yValue - parseInt(gingivalMargin[index]) * 6.5
                                return `${x},${y}`;
                        }).join(' ');
                }

                if (mode === "CAL") {
                        return xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = dontswappedQuadrant.includes(quadrant) ?
                                        yValue + ((parseFloat(gingivalMargin[index]) * 6.5) - (parseFloat(pocketDepth[index]) * 6.5))
                                        :
                                        yValue - ((parseFloat(gingivalMargin[index]) * 6.5) - (parseFloat(pocketDepth[index]) * 6.5))
                                return `${x},${y}`;
                        }).join(' ');
                }

                if (mode === "PD") {
                        let CAL_Line = xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = dontswappedQuadrant.includes(quadrant) ?
                                        yValue + ((parseFloat(gingivalMargin[index]) * 6.5) - (parseFloat(pocketDepth[index]) * 6.5))
                                        :
                                        yValue - ((parseFloat(gingivalMargin[index]) * 6.5) - (parseFloat(pocketDepth[index]) * 6.5))
                                return `${x},${y}`;
                        }).join(' ');

                        let GM_Line = xCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                const y = dontswappedQuadrant.includes(quadrant) ?
                                        yValue + parseInt(gingivalMargin[index]) * 6.5
                                        :
                                        yValue - parseInt(gingivalMargin[index]) * 6.5
                                return `${x},${y}`;
                        }).toReversed().join(' ');

                        return CAL_Line + " " + GM_Line
                }
        };

        const calculateInterPoints = (mode: Mode) => {

                //use GM from mesial of tooth number and use distal from another
                const nextToothNumber = String(extractNumericPart(toothNumber) - 1) + sideoftooth; // Decrement the numeric part
                const nextPocketDepth = watch(`${nextToothNumber}.depth`) || [0, 0, 0]; // Watch pocket depth values
                const nextGingivalMargin = watch(`${nextToothNumber}.margin`) || [0, 0, 0]; // Watch gingival margin values

                if (mode === "GM") {
                        return xinterCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                if (index === 0) {
                                        const y = dontswappedQuadrant.includes(quadrant) ? yValue + parseInt(gingivalMargin[2]) * 6.5 : yValue - parseInt(gingivalMargin[2]) * 6.5
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = dontswappedQuadrant.includes(quadrant) ? yValue + parseInt(nextGingivalMargin[0]) * 6.5 : yValue - parseInt(nextGingivalMargin[0]) * 6.5
                                        return `${x},${y}`;
                                }
                        }).join(' ');
                }

                if (mode === "CAL") {
                        return xinterCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                if (index === 0) {
                                        const y = dontswappedQuadrant.includes(quadrant) ?
                                                yValue + ((parseFloat(gingivalMargin[2]) * 6.5) - (parseFloat(pocketDepth[2]) * 6.5))
                                                :
                                                yValue - ((parseFloat(gingivalMargin[2]) * 6.5) - (parseFloat(pocketDepth[2]) * 6.5))
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = dontswappedQuadrant.includes(quadrant) ?
                                                yValue + ((parseFloat(nextGingivalMargin[0]) * 6.5) - (parseFloat(nextPocketDepth[0]) * 6.5))
                                                :
                                                yValue - ((parseFloat(nextGingivalMargin[0]) * 6.5) - (parseFloat(nextPocketDepth[0]) * 6.5))
                                        return `${x},${y}`;
                                }
                        }).join(' ');
                }

                if (mode === "PD") {
                        let CAL_Line = xinterCoords.map((x, index) => {
                                // Adjust the y coordinate based on PD and GM
                                if (index === 0) {
                                        const y = dontswappedQuadrant.includes(quadrant) ?
                                                yValue + ((parseFloat(gingivalMargin[2]) * 6.5) - (parseFloat(pocketDepth[2]) * 6.5))
                                                :
                                                yValue - ((parseFloat(gingivalMargin[2]) * 6.5) - (parseFloat(pocketDepth[2]) * 6.5))

                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = dontswappedQuadrant.includes(quadrant) ?
                                                yValue + ((parseFloat(nextGingivalMargin[0]) * 6.5) - (parseFloat(nextPocketDepth[0]) * 6.5))
                                                :
                                                yValue - ((parseFloat(nextGingivalMargin[0]) * 6.5) - (parseFloat(nextPocketDepth[0]) * 6.5))
                                        return `${x},${y}`;
                                }
                        }).join(' ');

                        let GM_Line = xinterCoords.map((x, index) => {
                                if (index === 0) {
                                        const y = dontswappedQuadrant.includes(quadrant) ?
                                                yValue + parseInt(gingivalMargin[2]) * 6.5
                                                :
                                                yValue - parseInt(gingivalMargin[2]) * 6.5
                                        return `${x},${y}`;
                                }
                                if (index === 1) {
                                        const y = dontswappedQuadrant.includes(quadrant) ?
                                                yValue + parseInt(nextGingivalMargin[0]) * 6.5
                                                :
                                                yValue - parseInt(nextGingivalMargin[0]) * 6.5
                                        return `${x},${y}`;
                                }
                        }).toReversed().join(' ');

                        return CAL_Line + " " + GM_Line
                }
        };

        return (
                <>
                        {status === "present" ?
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
                                : null}
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

const getToswap = (quadrant: Quadrants) => {
        const toswapQuadrants = ['Q1B', 'Q2B', 'Q3L', 'Q4L'];
        return toswapQuadrants.includes(quadrant) ? 'flex-col' : 'flex-col-reverse';
};