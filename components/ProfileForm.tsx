"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { memo } from "react";

const ProfileForm = memo(() => {
  const { register, control } = useFormContext();

  return (
    <div className="absolute z-50">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          {/* <Label htmlFor="lastName">Patient Last Name</Label> */}
          <Input
            {...register("profile.lastName")}
            id="lastName"
            className="py-0 absolute left-[240px] top-[210px] h-[25px] w-[220px] border-none "
          />
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="firstName">First Name</Label> */}
          <Input
            {...register("profile.firstName")}
            id="firstName"
            className="py-0 absolute left-[585px] top-[210px] h-[25px] w-[220px] border-none"
          />
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="dateOfBirth">Date of Birth</Label> */}
          <Input
            {...register("profile.dateOfBirth")}
            type="date"
            id="dateOfBirth"
            className="py-0 text-sm absolute border-2 px-0 pl-1 border-black left-[948px] top-[210px] h-[22px] w-[140px]  border-none"
          />
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="date">Date</Label> */}
          <Input
            {...register("profile.date")}
            type="date"
            id="date"
            className="py-0 absolute left-[585px] top-[159px] h-[22px] w-[140px]  border-none"
          />
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="clinician">Clinician</Label> */}
          <Input
            {...register("profile.clinician")}
            id="clinician"
            className="py-0 absolute border-none left-[867px] top-[264px] h-[25px] w-[205px]"
          />
        </div>
        <div className="space-y-2">
          <Controller
            name="profile.chartType"
            control={control}
            defaultValue="initial"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2 absolute left-[80px] top-[260px]">
                  <RadioGroupItem
                    value="initial"
                    id="initial"
                    className="w-[30px] h-[30px] rounded-none"
                  />
                </div>
                <div className="flex items-center space-x-2 absolute left-[270px] top-[260px]">
                  <RadioGroupItem
                    value="reevaluation"
                    id="reevaluation"
                    className="w-[30px] h-[30px] rounded-none"
                  />
                  <Label
                    className="text-2xl font-bold absolute -right-[160px]"
                    htmlFor="reevaluation"
                  >
                    Reevaluation
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>
    </div>
  );
});

// Add display name to the memoized component
ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;
