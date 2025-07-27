"use client";

import useSonido from "@/hooks/useSonido";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCircleCheck, FaRegBookmark } from "react-icons/fa6";
import { formatoDinero } from "@/utils/formatoDinero";
import { IoClose, IoHeartSharp } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { useAppContext } from "@/context/AppContext";

const ModalVerServicio = () => {
  const {
    openModalVerServicio,
    setOpenModalVerServicio,
    servicioSeleccionado,
  } = useAppContext();
  const { sonidoSolicitarServicio, sonidoRemoverServicio } = useSonido();
  const [isLiked, setIsLiked] = useState(false);
  const [contadorLikes, setContadorLikes] = useState(784);

  useEffect(() => {
    if (openModalVerServicio) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalVerServicio]);

  useEffect(() => {
    if (servicioSeleccionado) {
      setContadorLikes(servicioSeleccionado.likes);
    }
  }, [servicioSeleccionado]);

  return (
    <AnimatePresence>
      {openModalVerServicio && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-90 overflow-auto text-zinc-800 backdrop-blur-sm"
          onClick={() => setOpenModalVerServicio(false)}
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
            {/* Header */}
            <div className={`flex items-center justify-between px-2 py-4`}>
              <button
                onClick={() => setOpenModalVerServicio(false)}
                className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
              >
                <IoClose className="text-2xl" />
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
                  servicioSeleccionado.imagen || "/servicios/corte-cabello.jpg"
                }
                alt={servicioSeleccionado.nombre}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Contenido Scroll Horizontal */}
            <div className="px-4 pb-10">
              {/* Espacio para no tapar footer */}
              <div className="flex flex-col">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold">
                    {servicioSeleccionado.nombre}
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
                    {servicioSeleccionado.puntuacion.toFixed(1)} estrellas
                  </span>
                </div>
                <span className="text-gray-600 text-sm mt-2">
                  {servicioSeleccionado.descripcion}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <FaCircleCheck className="text-green-600" />
                  <span className="text-xs">
                    {servicioSeleccionado.adicional}
                  </span>
                </div>
                <span className="text-gray-500 text-xs mt-1">
                  Tiempo estimado de {servicioSeleccionado.duracion} minutos
                  aproximadamente.
                </span>
                <div className="flex items-center gap-2 mt-2 bg-blue-800/80 p-2 rounded-full w-max px-5">
                  <span className="text-sm text-white">Precio:</span>
                  <span className="text-sm font-bold text-white">
                    {formatoDinero(servicioSeleccionado.precio)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalVerServicio;
