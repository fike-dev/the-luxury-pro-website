import Link from "next/link";
import { auth } from "../_lib/auth";
// import { SunIcon } from "@heroicons/react/24/solid";

export default async function Navigation() {
  const session = await auth();
  // console.log(session);

  return (
    <nav className="z-10 md:text-xl text-md">
      <ul className="flex gap-4 sm:gap-10 md:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center md:gap-4 gap-2"
            >
              <img
                className="md:h-8 h-6 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Profile</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
        {/* <li>
          <SunIcon className="h-5 w-5 text-accent-500" />
        </li> */}
      </ul>
    </nav>
  );
}
