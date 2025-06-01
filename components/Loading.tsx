
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f7f7f7] z-50">
      <div className="relative flex flex-col items-center">
        <div className="animate-bounce w-24 h-24 bg-yellow-300 border-4 border-black rounded-xl shadow-[8px_8px_0_0_#000] flex items-center justify-center">
          <svg
            className="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="8" y="8" width="32" height="32" rx="8" fill="#fffde4" />
            <circle cx="24" cy="24" r="10" fill="#ffe066" />
            <path d="M18 28c2 2 8 2 12 0" stroke="#000" />
          </svg>
        </div>
        <span className="mt-6 px-6 py-2 bg-white border-4 border-black rounded-lg shadow-[4px_4px_0_0_#000] text-lg font-bold text-black">
          Loading...
        </span>
      </div>
    </div>
  );
}
