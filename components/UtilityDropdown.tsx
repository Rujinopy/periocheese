import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SaveAsImageButton from "@/components/SaveAsImageButton";

interface UtilityDropdownProps {
  formRef: React.RefObject<HTMLFormElement>;
  onClearData: () => void;
  onSaveJson: () => void;
}

const UtilityDropdown = ({ formRef, onClearData, onSaveJson }: UtilityDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg ml-5 text-black bg-white border-2 border-black px-4 p-1 h-fit my-auto hover:scale-105 transition-all duration-200 ease-in-out">
        <MoreVertical className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-2 border-black bg-white mt-3">
        <DropdownMenuItem>
          <SaveAsImageButton formRef={formRef} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClearData}
          className="hover:bg-red-500 hover:cursor-pointer">
          Clear Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSaveJson}
        className="hover:bg-gray-100 hover:cursor-pointer">
          Save JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UtilityDropdown;