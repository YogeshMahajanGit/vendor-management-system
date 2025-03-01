"use client";
import { useState } from "react";
import Inputs from "./Inputs";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function EditVendor({ vendor }) {
  const initialState = {
    name: vendor.name,
    bankAccount: vendor.bankAccount,
    bankName: vendor.bankName,
    address1: vendor.address1,
    address2: vendor.address2,
    city: vendor.city,
    country: vendor.country,
    zip: vendor.zip,
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
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}vendor/${vendor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        // router.refresh();
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

        <Button
          type={"submit"}
          label={"Update Vendor"}
        />
      </form>
    </div>
  );
}
