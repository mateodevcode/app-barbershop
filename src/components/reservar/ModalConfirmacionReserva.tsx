"use client";

import { useAppContext } from "@/context/AppContext";
import { servicios } from "@/data/servicios";
import { formatoFecha, formatoHora } from "@/utils/formatoFecha";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const ModalConfirmacionReserva = () => {
  const {
    openModalConfirmacionReserva,
    setOpenModalConfirmacionReserva,
    reservaConfirmada,
    setReservaConfirmada,
    barberos,
  } = useAppContext();

  useEffect(() => {
    if (openModalConfirmacionReserva) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalConfirmacionReserva]);

  const barberoSeleccionado = barberos.find(
    (barbero) => barbero._id === reservaConfirmada?.barbero_id
  );

  const servicioSeleccionado =
    reservaConfirmada?.servicio_id !== undefined &&
    typeof reservaConfirmada.servicio_id === "number"
      ? servicios[reservaConfirmada.servicio_id]
      : undefined;

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
                  <div className="flex flex-col items-center justify-center bg-green-100 rounded-lg shadow-lg p-8 px-10">
                    <FaCircleCheck className="text-green-600 text-4xl mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-green-600">
                      Reserva Confirmada
                    </h3>
                    <span className="text-base text-center text-green-600">
                      Para el{" "}
                      <strong>{formatoFecha(reservaConfirmada?.fecha)}</strong>{" "}
                      con <strong>{barberoSeleccionado?.nombre}</strong> para el
                      servicio de{" "}
                      <strong>{servicioSeleccionado?.nombre}</strong>.
                    </span>
                    <span className="text-base text-center text-gray-600 mt-2">
                      Hora de reserva:{" "}
                      <strong>
                        {formatoHora(reservaConfirmada?.hora_inicio)}
                      </strong>
                    </span>
                    <span className="text-center text-xs text-gray-500 mt-2">
                      Te esperamos pronto en nuestra barbería.
                    </span>
                    <div className="flex items-center justify-end mt-2 w-full">
                      <button
                        className="bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-zinc-800 transition duration-300 cursor-pointer select-none mt-4 text-xs flex items-center gap-2"
                        onClick={() => {
                          setReservaConfirmada(null);
                          setOpenModalConfirmacionReserva(false);
                        }}
                      >
                        <span>Cerrar</span>
                      </button>
                    </div>
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
