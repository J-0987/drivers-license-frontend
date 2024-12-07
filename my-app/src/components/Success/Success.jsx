import React from "react";

const Success = ({ message, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-green-100 border border-green-400 rounded-lg shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-green-600 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7 12l2-2m4 4l2-2m-6-2l2-2m4 4l2-2"
        />
      </svg>
      <p className="text-green-800 font-semibold text-lg mb-4">{message}</p>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Success;
