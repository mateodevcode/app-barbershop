"use client";

import React from "react";
import { MdEmail, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import IniciarTour from "../guia/IniciarTour";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosPhonePortrait } from "react-icons/io";
import { RiMapPin2Fill } from "react-icons/ri";
import { BsCameraFill, BsPerson } from "react-icons/bs";

const Configuracion = () => {
  const router = useRouter();

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url('/perfil/fondo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-11/12 flex flex-col items-start justify-center relative">
        <div className="flex items-center justify-between py-4 w-full sticky top-0 left-0 z-20">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-200 select-none">
            Configuración
          </h3>
          <IniciarTour />
        </div>
        <div className="p-4 w-full h-[88svh] mt-5">
          <div className="h-[70svh] bg-white rounded-lg shadow-md flex flex-col items-center justify-start py-8 md:py-20">
            <div className="flex flex-col items-center justify-center w-24 h-24 relative">
              <Image
                src="/perfil/usuario.jpg"
                alt="Usuario"
                width={500}
                height={500}
                className="rounded-full mb-4"
              />
              <div className="w-10 h-10 absolute bottom-0 right-0 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-zinc-200 transition-colors">
                <BsCameraFill className="text-blue-600" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <span className="text-2xl font-bold">Mateo Lizcano</span>
            </div>

            <div className="flex flex-col items-center justify-start w-full gap-4">
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Nombre de usuario
                </span>
                <div className="relative flex items-center gap-4">
                  <BsPerson className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    id="name"
                    type="name"
                    placeholder="Marcos Gonzalez"
                    // onChange={handleChange}
                    required
                    name="name"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Numero de telefono
                </span>
                <div className="relative flex items-center gap-4">
                  <IoIosPhonePortrait className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    id="telefono"
                    type="telefono"
                    placeholder="300-288-8529"
                    // onChange={handleChange}
                    required
                    name="telefono"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Correo electrónico
                </span>
                <div className="relative flex items-center gap-4">
                  <MdEmail className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    id="email"
                    type="email"
                    placeholder="marcos@gmail.com"
                    // onChange={handleChange}
                    required
                    name="email"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Dirección
                </span>
                <div className="relative flex items-center gap-4">
                  <RiMapPin2Fill className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    id="direccion"
                    type="direccion"
                    placeholder="Calle 123, Barranquilla, Atlantico"
                    // onChange={handleChange}
                    required
                    name="email"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => router.push("/perfil/editar")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer select-none active:scale-95 duration-75 text-sm"
              >
                Editar Perfil
              </button>
              <button
                onClick={() => router.push("/perfil/editar")}
                className="px-6 py-2 border-[1px] text-blue-600 border-blue-600 hover:text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer select-none active:scale-95 duration-75 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
