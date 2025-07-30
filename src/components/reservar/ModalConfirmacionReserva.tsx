"use client";

import { useAppContext } from "@/context/AppContext";
import { formatoHora } from "@/utils/formatoFecha";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const ModalConfirmacionReserva = () => {
  const {
    openModalConfirmacionReserva,
    setOpenModalConfirmacionReserva,
    reservaConfirmada,
    setReservaConfirmada,
  } = useAppContext();

  useEffect(() => {
    if (openModalConfirmacionReserva) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalConfirmacionReserva]);

  return (
    <AnimatePresence>
      {openModalConfirmacionReserva && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-90 overflow-auto text-zinc-800 backdrop-blur-sm"
          onClick={() => {
            setReservaConfirmada(null);
            setOpenModalConfirmacionReserva(false);
          }}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-10/12  flex flex-col bg-stone-50 rounded-2xl shadow-lg overflow-y-auto mx-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {reservaConfirmada !== null && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-10/12 mx-auto flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 px-10 relative">
                    <button
                      className="absolute top-2 right-2 bg-black/10 hover:bg-black/20 rounded-full p-2 transition duration-300 cursor-pointer select-none active:scale-95"
                      onClick={() => {
                        setReservaConfirmada(null);
                        setOpenModalConfirmacionReserva(false);
                      }}
                    >
                      <IoClose className="text-black text-xl" />
                    </button>
                    <FaCircleCheck className="text-green-600 text-5xl mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-black">
                      Gracias por elegirnos
                    </h3>
                    <span className="text-sm text-center text-gray-600">
                      Hora de reserva:{" "}
                      <strong className="text-black text-base">
                        {formatoHora(reservaConfirmada?.hora_inicio)}
                      </strong>
                    </span>
                    <span className="text-center text-xs text-gray-500 mt-2">
                      Te esperamos pronto en nuestra barbería.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmacionReserva;
