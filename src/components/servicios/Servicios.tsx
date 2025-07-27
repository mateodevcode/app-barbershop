"use client";

import React from "react";
import { servicios } from "@/data/servicios";
import { GrMoney } from "react-icons/gr";
import { WiTime4 } from "react-icons/wi";
import { formatoDinero } from "@/utils/formatoDinero";
import { ServicioInterface } from "@/types/Servicio";
import { useAppContext } from "@/context/AppContext";

const Servicios = () => {
  const serviciosFilterCuatro: ServicioInterface[] = servicios.slice(0, 4);
  const { setOpenModalServicioSeleccionado, setServicioSeleccionado } =
    useAppContext();

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg">Nuestros Servicios</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {serviciosFilterCuatro.map((servicio, index) => (
          <div
            key={index}
            onClick={() => {
              setOpenModalServicioSeleccionado(true);
              setServicioSeleccionado(servicio);
            }}
            className="p-4 rounded-lg h-40 flex flex-col justify-end relative"
            style={{
              backgroundImage: `url(${servicio.imagen_icono})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg" />
            <h3 className="font-semibold text-white z-20">{servicio.titulo}</h3>
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
  );
};

export default Servicios;
