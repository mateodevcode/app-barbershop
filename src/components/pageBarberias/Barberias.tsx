"use client";

import React from "react";
import { servicios } from "@/data/servicios";
import { GrMoney } from "react-icons/gr";
import { WiTime4 } from "react-icons/wi";
import { formatoDinero } from "@/utils/formatoDinero";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import IniciarTour from "../guia/IniciarTour";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { barberias } from "@/data/barberias";

const Barberias = () => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-11/12 flex flex-col items-start justify-center relative">
        <div className="flex items-center justify-between py-4 w-full sticky top-0 left-0 z-20">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800 select-none">
            Barberias
          </h3>
          <button className="text-zinc-800 select-none bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <CiLocationOn className="text-2xl" />
          </button>
        </div>
        <div className="p-4 w-full">
          <div className="flex items-center gap-2 mb-4">
            <CiLocationOn className="" />
            <span>Nuestras sedes</span>
          </div>
          <div className="flex flex-col gap-4 pb-16">
            {barberias.map((barberia) => (
              <div
                key={barberia.id}
                style={{
                  backgroundImage: `url(${barberia.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="mb-4 rounded-lg relative h-96"
              >
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <div className="flex flex-col items-start justify-end p-4 text-zinc-300 relative z-10 h-full">
                  <span className="font-semibold">{barberia.name}</span>
                  <span>{barberia.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barberias;
