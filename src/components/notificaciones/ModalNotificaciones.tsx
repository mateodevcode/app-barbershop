"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

const ModalNotificaciones = () => {
  const { openModalNotificaciones, setOpenModalNotificaciones } =
    useAppContext();

  useEffect(() => {
    if (openModalNotificaciones) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalNotificaciones]);

  return (
    <AnimatePresence>
      {openModalNotificaciones && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-opacity-90 overflow-auto text-zinc-800"
          onClick={() => setOpenModalNotificaciones(false)}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-full h-full flex flex-col bg-stone-50 overflow-y-auto mx-auto"
            style={{
              backgroundImage: `url('/notificaciones/fondo-nt.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, scale: 1, x: -400 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0, scale: 1, x: -400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-black/20" />

            {/* Header */}
            <div className={`flex items-center justify-between px-2 py-4 z-10`}>
              <button
                onClick={() => setOpenModalNotificaciones(false)}
                className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
              >
                <MdOutlineKeyboardArrowLeft className="text-2xl" />
              </button>
              <h3 className="text-xl font-semibold text-zinc-200 select-none">
                Notificaciones
              </h3>
              <button className="text-white bg-rose-600 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <IoIosNotificationsOutline className="text-xl" />
              </button>
            </div>

            {/* Detalle */}
            <div className="w-full p-8 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-2xl">
                  Centro de notificaciones
                </h2>
                <button className="text-zinc bg-white rounded-full p-2 text-xl flex items-center justify-center cursor-pointer select-none active:scale-95 transition-transform duration-200 hover:bg-gray-100">
                  <IoClose />
                </button>
              </div>
              {/* Notificaciones */}
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-start justify-between bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-lg p-4 cursor-pointer select-none gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/10 rounded-lg relative">
                    <TbPointFilled className="absolute text-lg text-blue-600 top-2 right-2" />
                    <IoIosNotificationsOutline className="text-2xl text-white" />
                  </div>
                  <div className="flex flex-col w-7/12 text-sm">
                    <span className="text-xs font-semibold">
                      Reserva confirmada
                    </span>
                    <span className="text-[10px] text-zinc-800">
                      Tu reserva ha sido confirmada para el servicio de corte de
                      cabello el 15 de octubre a las 3:00 PM.
                    </span>
                  </div>
                  <div className="">
                    <span className="text-[10px] text-zinc-800 w-10">
                      Hace 10 min
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-lg p-4 cursor-pointer select-none gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/10 rounded-lg relative">
                    <TbPointFilled className="absolute text-lg text-blue-600 top-2 right-2" />
                    <IoIosNotificationsOutline className="text-2xl text-white" />
                  </div>
                  <div className="flex flex-col w-7/12 text-sm">
                    <span className="text-xs font-semibold">
                      Reserva confirmada
                    </span>
                    <span className="text-[10px] text-zinc-800">
                      Tu reserva ha sido confirmada para el servicio de corte de
                      cabello el 15 de octubre a las 3:00 PM.
                    </span>
                  </div>
                  <div className="">
                    <span className="text-[10px] text-zinc-800 w-10">
                      Hace 10 min
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-lg p-4 cursor-pointer select-none gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/10 rounded-lg relative">
                    {/* <TbPointFilled className="absolute text-lg text-blue-600 top-2 right-2" /> */}
                    <IoIosNotificationsOutline className="text-2xl text-white" />
                  </div>
                  <div className="flex flex-col w-7/12 text-sm">
                    <span className="text-xs font-semibold">
                      Reserva confirmada
                    </span>
                    <span className="text-[10px] text-zinc-800">
                      Tu reserva ha sido confirmada para el servicio de corte de
                      cabello el 15 de octubre a las 3:00 PM.
                    </span>
                  </div>
                  <div className="">
                    <span className="text-[10px] text-zinc-800 w-10">
                      Hace 10 min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalNotificaciones;
