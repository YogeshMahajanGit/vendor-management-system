import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import ModalRemoveBtn from "./RemoveBtn";

export default function ListItem() {
  return (
    <>
      <div className="p-4 border rounded border-gray-300 my-3 flex justify-between gap-5 items-start shadow">
        <div>
          <h2 className="font-bold text-2xl">Name Vendor</h2>
          <h4 className="tracking-wide font-bold">731091091019</h4>
          <h4>Center Bank</h4>
        </div>

        <div className="flex gap-4">
          <ModalRemoveBtn />
          <Link href={"/edit/99"}>
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </>
  );
}
