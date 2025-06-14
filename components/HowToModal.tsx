"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { sendGAEvent } from "@next/third-parties/google";
// import Howto from "./Howto";


export default function HowToModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a href="/how-to">
        <button onClick={() => sendGAEvent("event","form_how_to_use_clicked", {value: "form_how_to_use_clicked"})} className="p-2 bg-white hover:bg-gray-100 hover:cursor-pointer hover:underline rounded-full text-black">
          how to use
        </button>
        </a>
      </DialogTrigger>
      {/* <DialogContent className="max-w-[90vw] w-full max-h-[90vh] overflow-y-auto bg-green-100">
        <Howto />
      </DialogContent> */}
    </Dialog>
  );
}