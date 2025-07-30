"use client";

import React from "react";
import { MdEmail, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosNotificationsOutline, IoIosPhonePortrait } from "react-icons/io";
import { LiaFileAlt } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { RiMapPin2Fill } from "react-icons/ri";
import { useAppContext } from "@/context/AppContext";
import { formatoFechaCorta } from "@/utils/formatoFecha";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { formatearNombreMayus } from "@/utils/formatearNombreMayus";
import { BsPersonCheck } from "react-icons/bs";

const Perfil = () => {
  const router = useRouter();
  const { usuario } = useAppContext();

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
            Perfil
          </h3>
          <button className="text-zinc-800 select-none bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <BsPersonCheck className="text-2xl" />
          </button>
        </div>
        <div className="p-4 w-full h-[88svh] mt-5">
          <div className="h-[70svh] bg-white rounded-lg shadow-md flex flex-col items-center justify-start py-8 md:py-20">
            <div className="flex flex-col items-center justify-center w-40 h-40">
              <Image
                src={usuario?.imageUrl || "/perfil/usuario.jpg"}
                alt={usuario?.name || "Usuario"}
                width={500}
                height={500}
                className="rounded-full mb-4"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <span className="text-2xl font-bold">
                {tomarDosPrimerosNombres(usuario?.name || "")}
              </span>
              <span className="text-sm text-zinc-400">
                {formatearNombreMayus(usuario?.rol || "")} desde:{" "}
                {formatoFechaCorta(usuario?.createdAt)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                className="text-2xl p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors text-white cursor-pointer select-none active:scale-95 duration-75"
                onClick={() => router.push("/mis-pedidos")}
              >
                <LiaFileAlt />
              </button>
              <button
                className="text-2xl p-3 bg-rose-600 rounded-full hover:bg-rose-700 transition-colors text-white cursor-pointer select-none active:scale-95 duration-75"
                onClick={() => router.push("/notificaciones")}
              >
                <IoIosNotificationsOutline />
              </button>
              <button
                className="text-2xl p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors text-white cursor-pointer select-none active:scale-95 duration-75"
                onClick={() => router.push("/configuracion")}
              >
                <CiSettings />
              </button>
            </div>

            <div>
              <div className="flex flex-col items-center text-zinc-800 mb-1">
                <span className="text-zinc-300 text-sm">
                  Numero de teléfono
                </span>
                <div className="flex items-center justify-center gap-2">
                  <IoIosPhonePortrait className="text-rose-600 text-xl" />
                  <span className="">
                    {usuario?.telefono || "No hay información disponible"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center text-zinc-800 mb-1">
                <span className="text-zinc-300 text-sm">
                  Correo electrónico
                </span>
                <div className="flex items-center justify-center gap-2">
                  <MdEmail className="text-rose-600 text-xl" />
                  <span className="">
                    {usuario?.email || "marcos@gmail.com"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center text-zinc-800 mb-1 justify-center">
                <span className="text-zinc-300 text-sm">Dirección</span>
                <div className="flex items-center justify-center gap-2">
                  <RiMapPin2Fill className="text-rose-600 text-xl" />
                  <span className="max-w-64">
                    {usuario?.direccion || "No hay información disponible"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
