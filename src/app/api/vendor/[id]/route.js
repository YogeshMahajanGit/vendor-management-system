import connectMongoDB from "@/libs/db";
import Vendor from "@/models/vendor";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    const updateVentordData = await request.json();

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      updateVentordData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Vendor updated successfully", vendor: updatedVendor },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating vendor:", error);
    return NextResponse.json(
      { error: "Failed to update vendor" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const vendor = await Vendor.findOne({ _id: id });

    return NextResponse.json({ vendor }, { status: 200 });
  } catch (error) {
    console.log("Error getting vendor with id:", error);
    return NextResponse.json(
      { error: "Failed to get vendor" },
      { status: 500 }
    );
  }
}
