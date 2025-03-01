import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import ModalRemoveBtn from "./RemoveBtn";

async function handleGetVendor() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}vendor`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function ListItem() {
  const { vendor } = await handleGetVendor();
  return (
    <>
      {vendor.map((item) => (
        <div
          className="p-4 border rounded border-gray-300 my-3 flex justify-between gap-5 items-start shadow"
          key={item._id}
        >
          <div>
            <h2 className="font-bold text-2xl">{item.name}</h2>
            <h4>{item.bankName}</h4>
            <h4 className="tracking-wide font-bold">{item.bankAccount}</h4>
          </div>

          <div className="flex gap-4">
            <ModalRemoveBtn id={item._id} />
            <Link href={`/edit/${item._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
