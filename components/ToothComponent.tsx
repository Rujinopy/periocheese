"use client";

import React, { useCallback } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import Toggleform from "./Toggleform";
import { Quadrants } from "./utils/utils";
import ImplantToggle from "./ImplantToggle";
import FurcationToggle from "./FurcationToggle";
import { teethWithOneFurcation, teethWithTwoFurcations } from "./utils/utils";

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
  sectionOrder?: (
    | "mobility"
    | "implant"
    | "furcation"
    | "bleeding"
    | "plaque"
    | "margin"
    | "depth"
  )[];
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
    depth: true,
  },
  sectionOrder = [
    "mobility",
    "implant",
    "furcation",
    "bleeding",
    "plaque",
    "margin",
    "depth",
  ],
}) => {
  const { control, setValue, watch } = useFormContext();
  const allTeeth = useWatch(); // More efficient than watch() for all fields

  const isAbsent = (tooth: string) => allTeeth?.[tooth]?.status === "absent";

  const handleToggleBlankFields = useCallback(() => {
    const baseNumber = toothNumber.slice(0, -1);
    const suffixes = ["b", "l", "p"];
    const currentStatus = watch(`${toothNumber}.status`) || "present";
    const newStatus = currentStatus === "present" ? "absent" : "present";
    suffixes.forEach((suffix) => {
      setValue(`${baseNumber}${suffix}.status`, newStatus);
    });
  }, [setValue, toothNumber, watch]);

  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case "mobility":
        return (
          sections.mobility && (
            <div
              className="flex items-center justify-center border-black w-[47px] overflow-hidden"
              style={{ height: '16px' }}
            >
              <Controller
                name={`${toothNumber}.mobility.0`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className={`text-center appearance-none border-none outline-none w-[47px] h-[16px] leading-[16px] ${
                      isAbsent(toothNumber) ? "bg-white text-white" : ""
                    }`}
                    style={{
                      padding: '0',
                      margin: '0',
                      verticalAlign: 'middle',
                    }}
                  >
                    <option value="">-</option>
                    <option value={"1"}>I</option>
                    <option value={"2"}>II</option>
                    <option value={"3"}>III</option>
                  </select>
                )}
              />
            </div>
          )
        );
      case "implant":
        return (
          sections.implant && (
            <div className="flex w-[47px] h-[16px]">
              <ImplantToggle
                name={`${toothNumber}.implant.0`}
                disabled={isAbsent(toothNumber)}
              />
            </div>
          )
        );
      case "furcation":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasTwoFurcations = teethWithTwoFurcations.includes(toothNumber as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasOneFurcation = teethWithOneFurcation.includes(toothNumber as any);

        return (
          sections.furcation && (
            <div className="flex divide-x-2 divide-black w-[47px] h-[16px] border-t border-black">
              {hasTwoFurcations ? (
                // Two furcation toggles
                <>
                  <FurcationToggle
                    name={`${toothNumber}.furcation.0`}
                    disabled={isAbsent(toothNumber)}
                    width="w-[23.5px]"
                  />
                  <FurcationToggle
                    name={`${toothNumber}.furcation.1`}
                    disabled={isAbsent(toothNumber)}
                    width="w-[23.5px]"
                  />
                </>
              ) : hasOneFurcation ? (
                // One furcation toggle
                <FurcationToggle
                  name={`${toothNumber}.furcation.0`}
                  disabled={isAbsent(toothNumber)}
                />
              ) : (
                // No furcation (disabled button)
                <input
                  type="button"
                  className="w-full text-center bg-black"
                  disabled
                />
              )}
            </div>
          )
        );
      case "bleeding":
        return (
          sections.bleeding && (
            <div className="flex divide-x-2 divide-black justify-between w-[47px]">
              {[0, 1, 2].map((index) => (
                <Toggleform
                  disabled={isAbsent(toothNumber)}
                  key={index}
                  name={`${toothNumber}.bleeding.${index}`}
                  onColor={isAbsent(toothNumber) ? "bg-white" : "bg-red-400"}
                />
              ))}
            </div>
          )
        );
      case "plaque":
        return (
          sections.plaque && (
            <div className="flex divide-x-2 divide-black w-[47px]">
              {[0, 1, 2].map((index) => (
                <Toggleform
                  disabled={isAbsent(toothNumber)}
                  key={index}
                  name={`${toothNumber}.plaque.${index}`}
                  onColor={isAbsent(toothNumber) ? "bg-white" : "bg-yellow-400"}
                />
              ))}
            </div>
          )
        );
      case "margin":
        return (
          sections.margin && (
            <div className="flex w-[47px]">
              {(["Q1B", "Q1P", "Q4B", "Q4L"].includes(quadrant)
                ? [0, 1, 2]
                : [2, 1, 0]
              ).map((index) => (
                <Controller
                  key={index}
                  name={`${toothNumber}.margin.${index}`}
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className={`w-full text-center flex justify-center items-center leading-none h-[24px] ${
                        isAbsent(toothNumber) ? "bg-white text-white" : ""
                      }`}
                    />
                  )}
                />
              ))}
            </div>
          )
        );
      case "depth":
        return (
          sections.depth && (
            <div>
              <div className="flex space-x-0 w-[47px]">
                {(["Q1B", "Q1P", "Q4B", "Q4L"].includes(quadrant)
                  ? [0, 1, 2]
                  : [2, 1, 0]
                ).map((index) => (
                  <Controller
                    key={index}
                    name={`${toothNumber}.depth.${index}`}
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        className={`w-full text-center leading-none h-[24px] ${
                          isAbsent(toothNumber) ? "bg-white text-white" : ""
                        }`}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-xs divide-y-2 divide-black w-[378/8 px] h-[162/8 px]">
      {quadrant.slice(2) !== "P" &&
        quadrant.slice(2) !== "L" &&
        (toothNumber.startsWith("1") || toothNumber.startsWith("2")) && (
          <Controller
            name={`${toothNumber}.status`}
            control={control}
            defaultValue="present"
            render={({ field }) => (
              <h3
                onClick={() => {
                  handleToggleBlankFields();
                  field.onChange(
                    field.value === "present" ? "absent" : "present"
                  );
                }}
                className="py-1 text-center cursor-pointer"
              >
                {toothNumber.slice(0, -1)}
              </h3>
            )}
          />
        )}

      <div className={`divide-y-2 divide-black flex ${getFlexClass(quadrant)}`}>
        {sectionOrder.map((section) => (
          <React.Fragment key={`${toothNumber}-${section}`}>
            {renderSection(section)}
          </React.Fragment>
        ))}
      </div>

      {quadrant.slice(2) !== "P" &&
        quadrant.slice(2) !== "L" &&
        (toothNumber.startsWith("3") || toothNumber.startsWith("4")) && (
          <Controller
            name={`${toothNumber}.status`}
            control={control}
            defaultValue="present"
            render={({ field }) => (
              <h3
                onClick={() => {
                  handleToggleBlankFields();
                  field.onChange(
                    field.value === "present" ? "absent" : "present"
                  );
                }}
                className="py-1 text-center cursor-pointer"
              >
                {toothNumber.slice(0, -1)}
              </h3>
            )}
          />
        )}
    </div>
  );
};

export default ToothComponent;

const getFlexClass = (quadrant: Quadrants) => {
  const validFlexCol = ["Q1B", "Q2B", "Q3L", "Q4L"];
  return validFlexCol.includes(quadrant) ? "flex-col" : "flex-col-reverse";
};
