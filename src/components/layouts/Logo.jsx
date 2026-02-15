import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 group select-none">
      <Image
        alt="logo-care-xyz"
        src={"/vercel.svg"}
        width={40}
        height={32}
        style={{ width: 40, height: 32, objectFit: "contain" }}
        className="transition-transform group-hover:scale-105"
      />
      <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-purple-700 transition">
        Care <span className="text-purple-600">xyz</span>
      </span>
    </Link>
  );
};

export default Logo;
