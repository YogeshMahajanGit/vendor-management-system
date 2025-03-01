import connectMongoDB from "@/libs/db";
import Vendor from "@/models/vendor";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB();

    const {
      name,
      bankAccount,
      bankName,
      address1,
      address2,
      city,
      country,
      zip,
    } = await request.json();

    if (!name || !bankAccount || !bankName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.create({
      name,
      bankAccount,
      bankName,
      address1,
      address2,
      city,
      country,
      zip,
    });

    return NextResponse.json(
      { message: "Vendor created successfully", vendor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();

    const vendor = await Vendor.find();

    return NextResponse.json(
      { message: "All Vendor", vendor },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch vendor" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();

    if (!id) {
      return NextResponse.json({ error: "Id not found" }, { status: 500 });
    }

    const vendor = await Vendor.findByIdAndUpdate(id);
    console.log(vendor);
    return NextResponse.json({ message: "Vendor Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete vendor" },
      { status: 400 }
    );
  }
}
