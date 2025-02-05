"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { TbPokeball } from "react-icons/tb";
import { PiHeartHalfFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";
import { FaPowerOff } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import UserMenu from "./userMenu";

export default function Navbar({ isLogged, user }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  console.log(user);

  return (
    <div className="h-full p-3 flex items-center justify-between">
      {/* LOGO */}
      <Link href="/">
        <div className="uppercase font-bold text-2xl">Logo</div>
      </Link>
      {/* HAMBURGER */}
      <div
        className="cursor-pointer md:hidden"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu === false ? (
          <FiMenu size={"4em"} />
        ) : (
          <IoCloseSharp
            size={"4em"}
            className="z-50 absolute top-3 right-3"
            color="rgb(185, 28, 28)"
          />
        )}
      </div>
      {/* MENU MOBILE */}
      {mobileMenu && (
        <div className="absolute z-40 w-screen h-screen bg-white text-red-700 font-bold top-0 left-0 flex flex-col items-center justify-center gap-10 text-4xl">
          <Link href="/">Home</Link>
          <Link href="/">Preferite</Link>
          <Link href="/">Elenco Carte</Link>
          <Link href="/">Carrello</Link>
          <Link href="/">LoginLogout</Link>
        </div>
      )}

      {/* MENU LIST DESKTOP */}
      <div className="w-3/4 hidden md:flex justify-end gap-5">
        <Link
          href="/"
          className="flex items-center gap-1 hover:scale-110 font-semibold"
        >
          <div>Home</div>
          <TbPokeball color="red" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1 hover:scale-110 font-semibold"
        >
          <div>Preferite</div>
          <PiHeartHalfFill color="blue" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1 hover:scale-110 font-semibold"
        >
          <div>Elenco Carte</div>
          <TbCardsFilled color="green" />
        </Link>
        {/* {isLogged && (
          <Link
            href="/"
            className="flex items-center gap-1 hover:scale-110 font-semibold"
          >
            <div>Carrello</div>
            <FaShoppingCart color="purple" />
          </Link>
        )} */}
        {!isLogged && (
          <Link
            href="/"
            className="flex items-center gap-1 hover:scale-110 font-semibold"
          >
            <div>Accedi</div>
            <FaPowerOff color="red" />
          </Link>
        )}
        {user && isLogged && (
          <Link
            href="/"
            className="flex items-center gap-1 hover:underline font-semibold"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div>Benvenuto, {user.email}</div>
            <FaPowerOff color="red" />
          </Link>
        )}
        {openMenu && <UserMenu user={user} />}
      </div>
    </div>
  );
}
