"use client";

import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { BsPersonCheck } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";

const Barberos = () => {
  const router = useRouter();
  const { barberos } = useAppContext();

  return (
    <div className="w-full flex items-center justify-center bg-zinc-50">
      <div className="w-11/12 flex flex-col items-start justify-center relative">
        <div className="flex items-center justify-between py-4 w-full sticky top-0 left-0 z-20">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800 select-none">
            Barberos
          </h3>
          <button className="text-zinc-800 select-none bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <RiTeamFill className="text-2xl" />
          </button>
        </div>
        <div className="p-4 w-full">
          <div className="grid grid-cols-1 gap-4 mt-4">
            {barberos.map((servicio, index) => (
              <div
                key={index}
                className="p-4 rounded-lg h-96 flex flex-col justify-end relative"
                style={{
                  backgroundImage: `url(${servicio.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-lg" />
                <div className="flex justify-between items-center text-white z-20">
                  <div className="flex items-center gap-1 text-sm">
                    <BsPersonCheck className="text-xl" />
                    <span>{servicio.nombre}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{servicio.telefono}</span>
                    <IoPhonePortraitOutline />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barberos;
