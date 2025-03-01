import EditVendor from "@/components/EditVendor";

async function handleGetVendorById(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}vendor/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to get vendor");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function page({ params }) {
  const { id } = await params;
  const { vendor } = await handleGetVendorById(id);
  return <EditVendor vendor={vendor} />;
}
