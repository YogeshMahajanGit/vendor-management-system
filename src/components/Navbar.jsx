import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center rounded bg-gray-500 px-8 py-3 ">
      <Link
        className="text-white text-xl font-bold tracking-wide"
        href={"/"}
      >
        LOGO
      </Link>
      <Link
        className="cursor-pointer"
        href={"/addVendor"}
      >
        <Button
          type={"submit"}
          label={"Add Vendor"}
        />
      </Link>
    </nav>
  );
}
