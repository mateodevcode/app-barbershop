import { barberias } from "@/data/barberias";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const Barberias = () => {
  return (
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
            className="mb-4 rounded-lg relative h-40"
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
  );
};

export default Barberias;
