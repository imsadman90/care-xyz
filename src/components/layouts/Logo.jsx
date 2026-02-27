import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 group select-none">
      <span className="text-2xl font-extrabold tracking-tight text-black transition">
        Care <span className="text-sky-600">xyz</span>
      </span>
    </Link>
  );
};

export default Logo;
