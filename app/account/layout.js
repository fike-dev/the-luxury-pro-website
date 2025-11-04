"use client";

import { useState } from "react";
import SideNavigation from "../_components/SideNavigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="grid grid-cols-[12rem_1fr] md:grid-cols-[16rem_1fr] h-full gap-2">
    //   <SideNavigation />
    //   <div className="py-1">{children}</div>
    // </div>
    <div className="h-full relative ">
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between p-3 bg-primary-900 text-primary-100 translate-y-[-40px]">
        <button onClick={() => setIsOpen(true)}>
          <Bars3Icon className="h-7 w-7" />
        </button>
        <h1>My account</h1>
      </div>
      {/* Sidebar for larger screens */}
      <div className=" hidden md:grid grid-cols-[16rem_1fr] h-full gap-2">
        <SideNavigation />
        <div className="py-1">{children} </div>
      </div>
      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 pt-20 left-0 h-full w-64 bg-primary-950 text-primary-100 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <div className="flex justify-between items-center p-4 border-b border-primary-700">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Use your existing component */}
          <SideNavigation />
        </div>
      </div>

      {/* For mobile content */}
      <div className="block md:hidden p-2 translate-y-[-40px]">{children}</div>
    </div>
  );
}
