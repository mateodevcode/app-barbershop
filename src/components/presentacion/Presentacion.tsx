import { hoyFormateadoColombia } from "@/utils/hoyFormateadoColombia";
import React from "react";

const Presentacion = () => {
  const hoy = hoyFormateadoColombia();

  return (
    <div className="flex items-start justify-between p-4 h-20">
      <div className="">
        <span className="text-2xl font-semibold">Hola,</span>
        <span className="text-xl"> Mateo Lizcano</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-lg font-semibold">{hoy}</span>
        <div className="text-2xl font-semibold flex items-center gap-4">
          <div className="w-5 h-5 bg-red-500 rounded-full"></div>
          <span>24°</span>
        </div>
      </div>
    </div>
  );
};

export default Presentacion;
