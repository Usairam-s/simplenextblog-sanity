import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

function Header() {
  return (
    <>
      <nav className="flex justify-between items-center mb-12  ">
        <div className="group">
          <div className="group">
            <Link className="text-3xl font-bold" href={"/"}>
              Daily <span className="text-primary">Media</span>
            </Link>
            <div className="h-1 w-0 group-hover:w-full bg-green-600 transition-all duration-200"></div>
          </div>
        </div>

        <ModeToggle />
      </nav>
    </>
  );
}

export default Header;
