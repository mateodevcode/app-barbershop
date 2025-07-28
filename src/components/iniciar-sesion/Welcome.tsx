"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { signIn } from "next-auth/react";

const Welcome = () => {
  const router = useRouter();

  return (
    <div
      className="w-full flex items-center justify-center h-svh p-4 bg-zinc-50"
      style={{
        backgroundImage: `url('/perfil/fondo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-11/12 flex flex-col items-start justify-start relative h-full">
        <div className="flex items-center justify-start py-4 w-full sticky top-0 left-0 z-20">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
        </div>
        <span className="text-2xl font-semibold text-white">Barberia</span>
        <span className="text-4xl text-white/80">Blessed by God</span>

        <div className="mt-8 flex flex-col items-start justify-center">
          <span className="text-6xl text-white">
            Transforma tu estilo, empieza por registrarte.
          </span>
          <span className="text-sm text-white/90 mt-4">
            No pierdas tiempo, asegura tu lugar y vive la experiencia de un
            corte profesional cuando más lo necesites.
          </span>
        </div>
        <div className="w-full max-w-md flex flex-col gap-2">
          <button
            className="flex items-center justify-center gap-4 border-[1px] border-white text-black p-3 rounded-lg mt-6 hover:bg-white/10 transition-colors w-full cursor-pointer select-none active:scale-95 duration-75"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
          >
            <FcGoogle />
            <span className="text-white"> Inicia sesión con Google</span>
          </button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after">
            <span className="relative z-10 text-white px-2">
              O continúa con
            </span>
          </div>
          <button
            className="flex items-center justify-center gap-4 border-[1px] border-white text-white p-3 rounded-lg hover:bg-white/10 transition-colors w-full cursor-pointer select-none active:scale-95 duration-75"
            onClick={() => router.push("/iniciar-sesion")}
          >
            <IoMdMail />
            <span> Inicia sesión con tu email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
