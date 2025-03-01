"use client";
import Button from "@/components/Button";
import Inputs from "@/components/Inputs";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(process.env.BACKEND_URL);

    if (!formData.name || !formData.bankAccount || !formData.bankName) {
      setError("All required fields must be filled");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}vendor`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError("failed to cereate a vendor");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
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
        {error ? error : ""}
        <Button
          type={"submit"}
          label={"Add Vendor"}
        />
      </form>
    </div>
  );
}
