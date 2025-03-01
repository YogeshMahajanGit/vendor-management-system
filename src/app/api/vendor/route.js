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

export async function GET(request) {
  try {
    await connectMongoDB();

    const searchParams = new URL(request.url).searchParams;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 3;
    const skip = (page - 1) * limit;

    const vendors = await Vendor.find().skip(skip).limit(limit);
    const totalCount = await Vendor.countDocuments();

    return NextResponse.json({
      vendors,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch vendor" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectMongoDB();

    if (!id) {
      return NextResponse.json({ error: "Id not found" }, { status: 500 });
    }

    const vendor = await Vendor.findByIdAndDelete(id);
    console.log(vendor);
    return NextResponse.json({ message: "Vendor Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete vendor" },
      { status: 400 }
    );
  }
}
