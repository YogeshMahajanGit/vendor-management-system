import React from "react";

export default function Button({ lable, type, handler }) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={handler}
      type={type}
    >
      {lable}
    </button>
  );
}
