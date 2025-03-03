import React from "react";

export default function Button({ label, type, handler }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      onClick={handler}
      type={type}
    >
      {label}
    </button>
  );
}
