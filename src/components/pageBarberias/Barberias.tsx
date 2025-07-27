"use client";

import React from "react";
import { servicios } from "@/data/servicios";
import { GrMoney } from "react-icons/gr";
import { WiTime4 } from "react-icons/wi";
import { formatoDinero } from "@/utils/formatoDinero";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import IniciarTour from "../guia/IniciarTour";
import { useRouter } from "next/navigation";

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
          <IniciarTour />
        </div>
        <div className="p-4 w-full">
          <div className="grid grid-cols-2 gap-4 mt-4">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="p-4 rounded-lg h-40 flex flex-col justify-end relative"
                style={{
                  backgroundImage: `url(${servicio.imagen_icono})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-lg" />
                <h3 className="font-semibold text-white z-20">
                  {servicio.titulo}
                </h3>
                <div className="flex justify-between items-center text-white z-20">
                  <div className="flex items-center gap-1 text-sm">
                    <WiTime4 className="text-xl" />
                    <span>{servicio.duracion}min</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{formatoDinero(servicio.precio)}</span>
                    <GrMoney />
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

export default Barberias;
