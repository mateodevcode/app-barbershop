"use client";

import useSonido from "@/hooks/useSonido";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaCircleCheck, FaRegBookmark } from "react-icons/fa6";
import { formatoDinero } from "@/utils/formatoDinero";
import { IoHeartSharp } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { servicios } from "@/data/servicios";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const ModalServicioSeleccionado = () => {
  const {
    openModalServicioSeleccionado,
    setOpenModalServicioSeleccionado,
    servicioSeleccionado,
    setServicioSeleccionado,
  } = useAppContext();
  const { sonidoSolicitarServicio, sonidoRemoverServicio } = useSonido();
  const [isLiked, setIsLiked] = useState(false);
  const [contadorLikes, setContadorLikes] = useState(784);

  useEffect(() => {
    if (openModalServicioSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalServicioSeleccionado]);

  useEffect(() => {
    if (servicioSeleccionado) {
      setContadorLikes(servicioSeleccionado.likes);
    }
  }, [servicioSeleccionado]);

  const serviciosSimilares = servicioSeleccionado
    ? servicios.filter(
        (servicio) => String(servicio.id) !== String(servicioSeleccionado.id)
      )
    : [];

  return (
    <AnimatePresence>
      {openModalServicioSeleccionado && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-opacity-90 overflow-auto text-zinc-800"
          onClick={() => setOpenModalServicioSeleccionado(false)}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-full h-full flex flex-col bg-stone-50 rounded-t-2xl shadow-lg overflow-y-auto mx-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-2 py-4`}>
              <button
                onClick={() => setOpenModalServicioSeleccionado(false)}
                className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
              >
                <MdOutlineKeyboardArrowLeft className="text-2xl" />
              </button>
              <h3 className="text-xl font-semibold text-zinc-800 select-none">
                Detalles
              </h3>
              <button className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center">
                <FaRegBookmark className="text-xl" />
              </button>
            </div>

            {/* Imagen */}

            <div className="flex justify-center w-full p-2 rounded-lg h-80">
              <Image
                src={
                  servicioSeleccionado?.imagen || "/servicios/corte-cabello.jpg"
                }
                alt={servicioSeleccionado?.nombre || "Servicio"}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Contenido Scroll Horizontal */}
            <div className="px-4 pb-24">
              {/* Espacio para no tapar footer */}
              <div className="flex flex-col">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold">
                    {servicioSeleccionado?.nombre}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {contadorLikes}
                    </span>
                    {isLiked ? (
                      <button
                        onClick={() => {
                          setIsLiked(false);
                          sonidoRemoverServicio();
                          setContadorLikes(contadorLikes - 1);
                        }}
                      >
                        <IoHeartSharp className="text-2xl cursor-pointer select-none active:scale-90 duration-300 transform text-red-600" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsLiked(true);
                          sonidoSolicitarServicio();
                          setContadorLikes(contadorLikes + 1);
                        }}
                      >
                        <IoHeartOutline className="text-2xl cursor-pointer select-none active:scale-90 duration-300 transform text-red-600" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <IoStar className="text-amber-400" />
                  <IoStar className="text-amber-400" />
                  <IoStar className="text-amber-400" />
                  <IoStar className="text-amber-400" />
                  <IoStarHalf className="text-amber-400" />
                  <span className="text-xs">
                    {servicioSeleccionado?.puntuacion.toFixed(1)} estrellas
                  </span>
                </div>
                <span className="text-gray-600 text-sm mt-2">
                  {servicioSeleccionado?.descripcion}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <FaCircleCheck className="text-green-600" />
                  <span className="text-xs">
                    {servicioSeleccionado?.adicional}
                  </span>
                </div>
                <span className="text-gray-500 text-xs mt-1">
                  Tiempo estimado de {servicioSeleccionado?.duracion} minutos
                  aproximadamente.
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-semibold">Similares</h3>
                <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-4">
                  {serviciosSimilares?.map((servicio, index) => (
                    <div
                      className="relative flex flex-col items-center justify-center min-w-[150px] h-36 p-4 active:scale-95 transition cursor-pointer select-none bg-white hover:bg-blue-800/80 hover:text-white rounded-lg shadow-md"
                      key={index}
                      onClick={() => {
                        setServicioSeleccionado(servicio);
                        setOpenModalServicioSeleccionado(true);
                      }}
                    >
                      <div className="w-20 h-20 flex items-center justify-center">
                        {servicio.icon}
                      </div>
                      <h4 className="font-semibold text-sm text-center mt-2">
                        {servicio.titulo}
                      </h4>
                      <span className="text-sm font-semibold opacity-55">
                        {formatoDinero(servicio.precio)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Fijo */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex items-center justify-between px-6 z-20">
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-zinc-800">
                  Precio
                </span>
                <span className="text-lg font-bold text-black">
                  {formatoDinero(servicioSeleccionado?.precio)}
                </span>
              </div>
              <Link
                href={`/reservar?servicio=${servicioSeleccionado?.id}`}
                className="bg-black hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm cursos-pointer select-none active:scale-95 duration-75 cursor-pointer"
                onClick={() => {
                  sonidoSolicitarServicio();
                  setOpenModalServicioSeleccionado(false);
                  setServicioSeleccionado(null);
                }}
              >
                Reservar Cita
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalServicioSeleccionado;
