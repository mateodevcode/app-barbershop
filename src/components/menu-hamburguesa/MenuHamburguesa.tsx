"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { IoClose } from "react-icons/io5";
import { opciones } from "@/data/opciones";
import { useRouter } from "next/navigation";

const MenuHamburguesa = () => {
  const { openModalMenuHamburguesa, setOpenMenuHamburguesa } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (openModalMenuHamburguesa) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalMenuHamburguesa]);

  return (
    <AnimatePresence>
      {openModalMenuHamburguesa && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-opacity-90 overflow-auto text-zinc-800"
          onClick={() => setOpenMenuHamburguesa(false)}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-full h-svh flex flex-col bg-stone-50 overflow-y-auto mx-auto rounded-r-2xl"
            style={{
              backgroundImage: `url('/menu-hamburguesa/fondo.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, scale: 1, x: -400 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0, scale: 1, x: -400 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-end px-2 py-4 z-10`}>
              <button
                className="text-zinc-800 bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center cursor-pointer select-none active:scale-95 duration-75 hover:bg-zinc-200"
                onClick={() => setOpenMenuHamburguesa(false)}
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Detalle */}
            <div className="w-full p-8 z-10">
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col items-start justify-center gap-4 bg-white rounded-lg p-8 cursor-pointer select-none h-[70svh]">
                  {opciones.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setOpenMenuHamburguesa(false);
                        router.push(item.enlace);
                      }}
                      className="flex items-center gap-4 w-full hover:text-blue-600"
                    >
                      <div className="text-xl p-2 flex items-center justify-center bg-black/10 rounded-lg relative">
                        {item.icono}
                      </div>
                      <span>{item.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuHamburguesa;
