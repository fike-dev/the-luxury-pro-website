"use client";

import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { useState } from "react";
// import {X, Menu} from ''

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <div className="h-full hidden md:flex">
        <ul className="hidden md:flex flex-col gap-2 h-full text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  pathname === link.href ? "bg-primary-800" : ""
                } `}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="h-7 w-7 text-accent-400" />
          ) : (
            <Bars3Icon className="h-7 w-7 text-accent-400" />
          )}
        </button>
      </div>
      <div
        className={`h-full md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-w-full" : "max-w-0"
        }`}
      >
        <ul className=" flex flex-col gap-2 h-full text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  pathname === link.href ? "bg-primary-800" : ""
                } `}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideNavigation;
