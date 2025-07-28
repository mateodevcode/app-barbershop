"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  MdLockOutline,
  MdOutlineKeyboardArrowLeft,
  MdOutlineMail,
} from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";

const IniciarSesion = () => {
  const router = useRouter();
  const [verContraseña, setVerContraseña] = useState(false);

  return (
    <div className="w-full flex items-center justify-center h-svh p-4 bg-zinc-50">
      <div className="w-11/12 flex flex-col items-start justify-start relative h-full">
        <div className="flex items-center justify-start py-4 w-full sticky top-0 left-0 z-20">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
        </div>
        <span className="text-2xl font-semibold text-zinc-800 mt-5">
          Barberia
        </span>
        <span className="text-4xl text-zinc-600">Blessed by God</span>

        <div className="grid gap-6 mt-12 w-full">
          <div className="grid gap-2 border-[1px] border-zinc-400 rounded-lg px-4 py-3 relative">
            <span className="text-xs bg-zinc-50 absolute left-4 -top-2 px-2 text-zinc-400">
              Correo Electrónico
            </span>
            <div className="relative flex items-center gap-4">
              <MdOutlineMail className="h-4 w-4 text-muted-foreground" />
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
          <div className="grid gap-2 border-[1px] rounded-lg px-4 py-3 relative border-zinc-400">
            <span className="text-xs bg-zinc-50 absolute left-4 -top-2 px-2 text-zinc-400">
              Contraseña
            </span>
            <div className="relative flex items-center gap-4">
              <MdLockOutline className="text-xl text-muted-foreground" />
              <input
                id="password"
                type={verContraseña ? "text" : "password"}
                placeholder="**********"
                // onChange={handleChange}
                // value={formData.password}
                required
                name="password"
                className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
              />
              <div className="flex items-center justify-center">
                {verContraseña ? (
                  <IoEyeOutline
                    className="cursor-pointer"
                    onClick={() => setVerContraseña(false)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="cursor-pointer"
                    onClick={() => setVerContraseña(true)}
                  />
                )}
              </div>
            </div>
          </div>
          <Link
            href="/olvidaste-tu-contrasena"
            className="ml-auto text-xs underline-offset-4 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="w-full max-w-md flex flex-col gap-2 mt-6">
          <button
            className="flex items-center justify-center gap-4 border-[1px] border-zinc-400 text-black p-3 rounded-lg hover:bg-black/5 transition-colors w-full cursor-pointer select-none active:scale-95 duration-75"
            onClick={() => router.push("/login")}
          >
            <IoMdMail />
            <span> Iniciar sesión con tu email</span>
          </button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after border-zinc-300">
            <span className="relative z-10 text-zinc-800 bg-zinc-50 px-2">
              O continúa con
            </span>
          </div>
          <button
            className="flex items-center justify-center gap-4 bg-black text-white p-3 rounded-lg hover:bg-black/80 transition-colors w-full cursor-pointer select-none active:scale-95 duration-75"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
          >
            <FcGoogle />
            <span className=""> Iniciar sesión con Google</span>
          </button>
        </div>
        <div className="text-center text-sm my-5 text-black w-full">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => router.push("/registrarse")}
            className="font-semibold hover:text-black/80 cursor-pointer select-none"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
