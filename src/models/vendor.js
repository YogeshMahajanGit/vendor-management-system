import mongoose, { Schema } from "mongoose";

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    bankAccount: { type: String, required: true },
    bankName: { type: String, required: true },
    address1: String,
    address2: String,
    city: String,
    country: String,
    zip: String,
  },
  { timestamps: true }
);

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

export default Vendor;
