"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import ModalRemoveBtn from "./RemoveBtn";

export default function ListItem() {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadVendors() {
      const data = await handleGetVendor(currentPage);
      if (data) {
        setVendors(data.vendors || []);
        setTotalPages(data.totalPages || 1);
      }
    }
    loadVendors();
  }, [currentPage]);

  async function handleGetVendor(page) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}vendor?page=${page}&limit=3`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {vendors.map((item) => (
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

      {/* Pagination*/}

      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
