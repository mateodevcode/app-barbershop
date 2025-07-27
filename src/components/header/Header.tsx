"use client";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React from "react";
import { BsList } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
  const router = useRouter();
  const { setOpenModalNotificaciones, setOpenMenuHamburguesa } =
    useAppContext();

  return (
    <div className="h-14 bg-white flex items-center justify-between px-2 sticky top-0 left-0 right-0 z-20">
      <button
        className="p-2 text-zinc-800 text-3xl cursor-pointer select-none active:scale-95 transition-transform duration-200 hover:text-zinc-600"
        onClick={() => setOpenMenuHamburguesa(true)}
      >
        <BsList />
      </button>
      <div className="flex items-center gap-2 px-2">
        <button
          className="p-2 text-rose-600 text-3xl cursor-pointer select-none active:scale-95 transition-transform duration-200 hover:text-rose-700"
          onClick={() => setOpenModalNotificaciones(true)}
        >
          <IoIosNotificationsOutline />
        </button>
        <button
          className="p-2 text-zinc-800 text-3xl cursor-pointer select-none active:scale-95 transition-transform duration-200 hover:text-zinc-600"
          onClick={() => router.push("/perfil")}
        >
          <IoPersonCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default Header;
