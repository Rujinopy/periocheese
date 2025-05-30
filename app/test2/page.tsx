"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ToothComponent from "@/components/ToothComponent";
import RecordingButton from "@/components/RecordingButton";
import Periovectors from "@/components/Periovectors";
import { Quadrants, toothData } from "@/components/utils/utils";
import SaveAsImageButton from "@/components/SaveAsImageButton"; // Import the button
import LineAbsence from "@/components/LineAbsence";
import ImplantImage from "@/components/ImplantImage";
import FurcationOverlay from "@/components/FurcationOverlay";

export default function Page() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState("");
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
          dataArray.forEach((data, i) => {
            const quadrant = data.toothNumber.slice(0, 1);
            // Conditionally set depth if it exists
            if (data.depth) {
              if (quadrant === "1" || quadrant === "4") {
                setValue(`${data.toothNumber}.depth`, data.depth);
              } else {
                setValue(`${data.toothNumber}.depth`, data.depth.toReversed());
              }
            }

            // Conditionally set margin if it exists
            if (data.margin) {
              if (quadrant === "1" || quadrant === "4") {
                setValue(`${data.toothNumber}.margin`, data.margin);
              } else {
                setValue(
                  `${data.toothNumber}.margin`,
                  data.margin.toReversed()
                );
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
              setValue(`${data.toothNumber}.mobility.0`, data.mobility);
            }
            if (data.furcation) {
              // Handle array of furcation values
              data.furcation.forEach((value: number, index: number) => {
                setValue(`${data.toothNumber}.furcation.${index}`, value);
              });
            }
            if (data.implant) {
              const baseNumber = data.toothNumber.slice(0, 2); // Get base number (e.g., "26" from "26b")
              // Determine surfaces based on tooth number
              const surfaces =
                parseInt(baseNumber) <= 28
                  ? ["b", "p"] // Upper teeth (11-28): buccal and palatal
                  : ["b", "l"]; // Lower teeth (31-48): buccal and lingual

              // Set implant value for all surfaces
              surfaces.forEach((surface) => {
                const toothId = `${baseNumber}${surface}`;
                setValue(`${toothId}.implant.0`, Number(data.implant));
              });
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
    console.log("Submitted Data:", data);
  };

  return (
    <div className="w-full">
      {/* Recording Button */}
      <div className="fixed top-[0px] left-[50%] flex z-50">
        <RecordingButton
          setAudioURL={setAudioURL}
          setTranscription={setTranscription}
          setLoading={setLoading}
          loading={loading} // Pass the loading state here
        />
        <SaveAsImageButton formRef={formRef} />
      </div>

      {/*BODY  */}
      <div ref={formRef} className="mx-auto w-[1200px] h-[1600px]">
        <div
          className="relative w-[1200px] h-[1600px]"
          style={{ paddingTop: "133.33%" }}
        >
          <div
            id="chart"
            className="absolute top-0 left-0 w-full h-full origin-top-left"
          >
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="absolute top-0 left-0 w-full h-full origin-top-left z-40 "
              >
                {/* Base layers */}
                <div className="absolute w-full h-full z-20 top-0 left-0">
                  <img
                    src="/grid/chart-grid-box.svg"
                    alt="grid"
                    className="w-full h-full"
                  />
                </div>

                {/* Implant Images */}
                <div className="absolute z-[15]">
                  {toothData.map((data, index) => (
                    <ImplantImage key={index} toothNumber={data.toothNumber} />
                  ))}
                </div>

                {/* SVG Teeth layer */}
                <div className="absolute w-full h-full z-10 top-0 left-0">
                  <img src="/grid/svg_teeth.svg" className="w-full h-full" />
                </div>
                <FurcationOverlay />
                {/* LineAbsence - Move this above other interactive components */}
                <div className="absolute z-[45] md:scale-100 transform scale-100 mx-auto">
                  {toothData.map((data, index) =>
                    data?.absenceLine ? (
                      <div key={index} className="w-5">
                        <LineAbsence
                          key={index}
                          toothNumber={data.toothNumber}
                        />{" "}
                      </div>
                    ) : null
                  )}
                </div>

                <button
                  className="z-50 hover:cursor-pointer bg-blue-500 text-white p-2 rounded-md bottom-10 right-4 absolute left-0 top-0 w-40 h-20"
                  type="submit"
                >
                  Submit
                </button>
                <div className=" w-full mx-auto ">
                  <svg className="absolute z-30 left-0 top-0 w-[1200px] h-[1600px] ">
                    {[
                      "18b",
                      "17b",
                      "16b",
                      "15b",
                      "14b",
                      "13b",
                      "12b",
                      "11b",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q1B}
                      />
                    ))}
                    {[
                      "28b",
                      "27b",
                      "26b",
                      "25b",
                      "24b",
                      "23b",
                      "22b",
                      "21b",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q2B}
                      />
                    ))}
                    {[
                      "18p",
                      "17p",
                      "16p",
                      "15p",
                      "14p",
                      "13p",
                      "12p",
                      "11p",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q1P}
                      />
                    ))}
                    {[
                      "28p",
                      "27p",
                      "26p",
                      "25p",
                      "24p",
                      "23p",
                      "22p",
                      "21p",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q2P}
                      />
                    ))}
                    {[
                      "38b",
                      "37b",
                      "36b",
                      "35b",
                      "34b",
                      "33b",
                      "32b",
                      "31b",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q3B}
                      />
                    ))}
                    {[
                      "38l",
                      "37l",
                      "36l",
                      "35l",
                      "34l",
                      "33l",
                      "32l",
                      "31l",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q3L}
                      />
                    ))}
                    {[
                      "41b",
                      "42b",
                      "43b",
                      "44b",
                      "45b",
                      "46b",
                      "47b",
                      "48b",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q4B}
                      />
                    ))}
                    {[
                      "41l",
                      "42l",
                      "43l",
                      "44l",
                      "45l",
                      "46l",
                      "47l",
                      "48l",
                    ].map((tooth) => (
                      <Periovectors
                        key={tooth}
                        toothNumber={tooth}
                        quadrant={Quadrants.Q4L}
                      />
                    ))}
                  </svg>

                  {/* Teeth Components */}
                  <div className="absolute z-40">
                    <div className="flex divide-x-2 divide-black border border-black absolute left-[285px] top-[312px] ">
                      {[
                        "18b",
                        "17b",
                        "16b",
                        "15b",
                        "14b",
                        "13b",
                        "12b",
                        "11b",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q1B}
                        />
                      ))}
                    </div>
                    <div className="flex divide-x-2 divide-black border border-black absolute left-[685px] top-[312px]">
                      {[
                        "21b",
                        "22b",
                        "23b",
                        "24b",
                        "25b",
                        "26b",
                        "27b",
                        "28b",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q2B}
                        />
                      ))}
                    </div>

                    <div className="flex divide-x-2 divide-black border border-black absolute left-[285px] top-[805px]">
                      {[
                        "18p",
                        "17p",
                        "16p",
                        "15p",
                        "14p",
                        "13p",
                        "12p",
                        "11p",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q1P}
                          sections={{
                            mobility: false,
                            implant: false, // Hide implant section
                            furcation: true,
                            bleeding: true,
                            plaque: true, // Hide plaque section
                            margin: true,
                            depth: true,
                          }}
                          sectionOrder={[
                            "furcation",
                            "bleeding",
                            "plaque",
                            "depth",
                            "margin",
                          ]}
                        />
                      ))}
                    </div>

                    <div className="flex divide-x-2 divide-black border border-black absolute left-[685px] top-[805px]">
                      {[
                        "21p",
                        "22p",
                        "23p",
                        "24p",
                        "25p",
                        "26p",
                        "27p",
                        "28p",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q2P}
                          sections={{
                            mobility: false,
                            implant: false, // Hide implant section
                            furcation: true,
                            bleeding: true,
                            plaque: true, // Hide plaque section
                            margin: true,
                            depth: true,
                          }}
                          sectionOrder={[
                            "furcation",
                            "bleeding",
                            "plaque",
                            "depth",
                            "margin",
                          ]}
                        />
                      ))}
                    </div>

                    <div className="flex divide-x-2 divide-black border border-black absolute left-[685px] top-[1420px]">
                      {[
                        "31b",
                        "32b",
                        "33b",
                        "34b",
                        "35b",
                        "36b",
                        "37b",
                        "38b",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q3B}
                          sectionOrder={[
                            "mobility",
                            "implant",
                            "furcation",
                            "bleeding",
                            "plaque",
                            "depth",
                            "margin",
                          ]}
                        />
                      ))}
                    </div>

                    <div className="flex divide-x-2 divide-black border border-black absolute left-[685px] top-[987px]">
                      {[
                        "31l",
                        "32l",
                        "33l",
                        "34l",
                        "35l",
                        "36l",
                        "37l",
                        "38l",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q3L}
                          sections={{
                            mobility: false,
                            implant: false, // Hide implant section
                            furcation: true,
                            bleeding: true,
                            plaque: true, // Hide plaque section
                            margin: true,
                            depth: true,
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex divide-x-2 divide-black border border-black absolute left-[285px] top-[1420px]">
                      {[
                        "48b",
                        "47b",
                        "46b",
                        "45b",
                        "44b",
                        "43b",
                        "42b",
                        "41b",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q4B}
                          sectionOrder={[
                            "mobility",
                            "implant",
                            "furcation",
                            "bleeding",
                            "plaque",
                            "depth",
                            "margin",
                          ]}
                        />
                      ))}
                    </div>

                    <div className="flex divide-x-2 divide-black border border-black absolute left-[285px] top-[987px]">
                      {[
                        "48l",
                        "47l",
                        "46l",
                        "45l",
                        "44l",
                        "43l",
                        "42l",
                        "41l",
                      ].map((tooth) => (
                        <ToothComponent
                          key={tooth}
                          toothNumber={tooth}
                          quadrant={Quadrants.Q4L}
                          sections={{
                            mobility: false,
                            implant: false, // Hide implant section
                            furcation: true,
                            bleeding: true,
                            plaque: true, // Hide plaque section
                            margin: true,
                            depth: true,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
