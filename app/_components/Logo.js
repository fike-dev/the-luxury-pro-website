import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        height="60"
        width="60"
        className="h-8 w-8 md:h-auto md:w-auto"
        quality={100}
        alt="The Wild Oasis logo"
      />
      <span className="md:text-xl text-lg font-semibold text-primary-100">
        Luxury Pro
      </span>
    </Link>
  );
}

export default Logo;
