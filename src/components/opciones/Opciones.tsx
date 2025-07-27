"use client";

import { opciones } from "@/data/opciones";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Opciones = () => {
  const router = useRouter();
  const [mensaje] = useState<string>(
    "Hola, me gustaría obtener más información sobre sus servicios."
  );
  const [telefono] = useState<string>("573002888529");

  const handleContactClick = () => {
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {opciones.map((opcion, index) => (
        <button
          key={index}
          onClick={() => {
            if (opcion.enlace === "whatsapp") {
              handleContactClick();
            } else {
              router.push(opcion.enlace);
            }
          }}
          className="flex flex-col items-center justify-center h-24 gap-2 cursor-pointer select-none"
        >
          <div className="text-2xl p-5 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
            {opcion.icono}
          </div>
          <span className="text-xs font-semibold">{opcion.nombre}</span>
        </button>
      ))}
    </div>
  );
};

export default Opciones;
