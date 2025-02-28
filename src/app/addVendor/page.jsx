"use client";
import Button from "@/components/Button";
import Inputs from "@/components/Inputs";
import { useState } from "react";

export default function page() {
  const initialState = {
    name: "",
    bankAccount: "",
    bankName: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    zip: "",
  };

  const fields = [
    { label: "Vendor Name", name: "name", required: true },
    {
      label: "Bank Account No",
      name: "bankAccount",
      type: "number",
      required: true,
    },
    { label: "Bank Name", name: "bankName", required: true },
    { label: "Address Line 1", name: "address1", required: true },
    { label: "Address Line 2", name: "address2" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
    { label: "Zip Code", name: "zip", type: "number" },
  ];
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form
        // onSubmit={handleSubmit}
        className="p-4 border rounded"
      >
        {fields.map(({ label, name, type, required }) => (
          <Inputs
            key={name}
            type={type}
            label={label}
            name={name}
            required={required}
            value={formData[name]}
            onChange={handleChange}
          />
        ))}

        <Button
          type={"submit"}
          lable={"Add Vendor"}
        />
      </form>
    </div>
  );
}
