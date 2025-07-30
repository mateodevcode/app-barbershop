"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { servicios } from "@/data/servicios";
import IniciarTour from "@/components/guia/IniciarTour";
import { mesesSinDomingo } from "@/data/meses";
import { obtenerDosLetras } from "@/utils/obtenerDosLetras";
import { obtenerFechaISO } from "@/utils/obtenerFechaISO";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { formatoDinero } from "@/utils/formatoDinero";
import { BsFillPersonFill } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoMdOpen } from "react-icons/io";
import { completarDia } from "@/utils/completarDia";
import { useAppContext } from "@/context/AppContext";
import { reservasSchema } from "@/validations/reservas";
import { ReservaInterface } from "@/types/Reserva";

interface Horario {
  hora_inicio: string; // ISO string
  hora_fin?: string; // opcional, si lo usas después
  hora: string; // supongo que es un string también
}

const Reservar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mesesSinDoming = mesesSinDomingo();
  const servicioParam = searchParams.get("servicio") ?? "";

  const {
    barberos,
    setOpenModalVerServicio,
    setServicioSeleccionado,
    setReservaConfirmada,
    setOpenModalConfirmacionReserva,
  } = useAppContext();

  const [Dia, setDia] = useState<string>("");
  const [duracion, setDuracion] = useState<number>(0);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");

  interface FormData {
    nombre: string;
    telefono: string;
    servicio: string;
    barbero: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    fecha: string;
  }

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    servicio: servicioParam,
    barbero: "",
    hora_inicio: "",
    hora_fin: "",
    estado: "confirmada",
    fecha: "",
  });

  useEffect(() => {
    if (formData.barbero && formData.fecha && duracion) {
      fetch(
        `/api/horarios-disponibles?barberoId=${formData.barbero}&fecha=${formData.fecha}&duracion=${duracion}`
      )
        .then((res) => res.json())
        .then((data: Horario[]) => setHorarios(data));
    } else {
      setHorarios([]);
    }
  }, [formData.barbero, formData.fecha, duracion]);

  useEffect(() => {
    if (servicioParam) {
      const servicioEncontrado = servicios.find(
        (servicio) => Number(servicio.id) === Number(servicioParam)
      );
      if (servicioEncontrado) {
        setDuracion(servicioEncontrado.duracion);
      }
    }
  }, [servicioParam]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: ReservaInterface = {
      ...formData,
      barbero_id: formData.barbero,
      servicio_id: formData.servicio,
      cliente_nombre: formData.nombre,
      cliente_telefono: formData.telefono,
      fecha: formData.fecha ? new Date(formData.fecha) : new Date(),
      hora_inicio: horaSeleccionada ? new Date(horaSeleccionada) : new Date(),
      hora_fin: new Date(
        horaSeleccionada
          ? new Date(horaSeleccionada).getTime() + duracion * 60000
          : new Date().getTime() + duracion * 60000
      ),
      estado: "confirmada",
    };

    const errores = reservasSchema(data);

    if (errores.length > 0) {
      errores.forEach((e) => toast.error(e));
      return;
    }

    try {
      const horaInicio = new Date(horaSeleccionada);
      const horaFin = new Date(horaInicio.getTime() + duracion * 60000);

      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barbero_id: formData.barbero,
          servicio_id: formData.servicio,
          cliente_nombre: formData.nombre,
          cliente_telefono: formData.telefono,
          hora_inicio: horaInicio.toISOString(),
          hora_fin: horaFin.toISOString(),
          fecha: formData.fecha,
        }),
      });
      const data = await response.json();
      setReservaConfirmada(data.reserva);
      setOpenModalConfirmacionReserva(true);
      toast.success("Reserva confirmada.", {
        position: "top-right",
      });
      setFormData({
        nombre: "",
        telefono: "",
        servicio: "",
        barbero: "",
        hora_inicio: "",
        hora_fin: "",
        estado: "confirmada",
        fecha: "",
      });
      setDia("");
      setDuracion(0);
      setHoraSeleccionada("");
      setHorarios([]);
    } catch (error) {
      console.error("Error al guardar la cita:", error);
      toast.error("Error al guardar la cita. Inténtalo de nuevo.", {
        position: "top-right",
      });
      setReservaConfirmada(null);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center bg-zinc-100">
        <div className="w-11/12 flex flex-col items-start justify-center relative">
          <div className="flex items-center justify-between py-4 w-full sticky top-0 left-0 z-20 bg-zinc-100">
            <button
              onClick={() => router.push("/")}
              className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
            >
              <MdOutlineKeyboardArrowLeft className="text-2xl" />
            </button>
            <h3 className="text-xl font-semibold text-zinc-800 select-none">
              Reservar Cita
            </h3>
            <IniciarTour />
          </div>

          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Seleccionar el día</h2>
            <span className="text-sm font-semibold text-blue-700">
              {mesesSinDoming[0].mes}
            </span>
          </div>
          <div
            className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5"
            id="div-dia"
          >
            {mesesSinDoming.map((mes, index) => (
              <React.Fragment key={index}>
                <div
                  className={`min-w-[70px] min-h-[100px] hover:text-white hover:bg-blue-800/80 flex items-center justify-center rounded-lg shadow-lg flex-col card-dia transition active:scale-95 transform duration-75 cursor-pointer select-none ${
                    String(mes.dia) === Dia
                      ? "bg-blue-800/80 text-white"
                      : "bg-white"
                  }`}
                  id={String(mes.dia)}
                  key={index}
                  onClick={(e) => {
                    setDia(e.currentTarget.id);
                    setFormData({
                      ...formData,
                      fecha: obtenerFechaISO(
                        e.currentTarget.id,
                        mesesSinDoming[0].mes
                      ),
                    });
                  }}
                >
                  <span className="font-semibold">
                    {obtenerDosLetras(mes.nombre)}
                  </span>
                  <span className="opacity-70">{completarDia(mes.dia)}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona un servicio</h2>
          </div>
          <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
            {servicios.map((servicio, index) => (
              <div
                className={`relative  flex flex-col items-center justify-center min-w-[150px] h-36 rounded-xl shadow-lg p-4 hover:text-white hover:bg-blue-800/80 active:scale-95 transform duration-75 cursor-pointer select-none card-servicio ${
                  String(servicio.id) === formData.servicio
                    ? "bg-blue-800/80 text-white"
                    : "bg-white"
                }`}
                key={index}
                id={String(servicio.id)}
                onClick={(e) => {
                  setDuracion(servicio.duracion);
                  setFormData({
                    ...formData,
                    servicio: e.currentTarget.id,
                  });
                }}
              >
                <button
                  className="absolute top-2 right-2 text-white text-lg p-2 rounded-lg bg-black/20 shadow-lg select-none cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModalVerServicio(true);
                    setServicioSeleccionado(servicio);
                  }}
                >
                  <IoMdOpen />
                </button>
                {servicio.icon}
                <h4 className="font-semibold text-sm text-center">
                  {servicio.titulo}
                </h4>
                <span className="opacity-60 font-semibold text-xs">
                  {formatoDinero(servicio.precio)}
                </span>
                <span className="opacity-80 text-xs pb-5">
                  Aprox. ({servicio.duracion} min)
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona tu barbero</h2>
          </div>
          <div className="flex flex-row items-center space-x-2 overflow-auto w-full justify-start py-5">
            {barberos.map((barbero, index) => (
              <div
                key={index}
                id={String(barbero._id)}
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    barbero: e.currentTarget.id,
                  });
                }}
                className={`min-w-[100px] min-h-[100px]  hover:bg-blue-800/80 hover:text-white flex items-center justify-center rounded-lg shadow-lg flex-col space-y-1 card-barbero active:scale-95 transform duration-75 cursor-pointer select-none ${
                  String(barbero._id) === formData.barbero
                    ? "bg-blue-800/80 text-white"
                    : "bg-white"
                }`}
              >
                <Image
                  src={`${barbero.imagen}`}
                  alt={barbero.nombre}
                  width={200}
                  height={200}
                  className="rounded-full w-14"
                />
                <span className="text-xs mt-1 font-semibold">
                  {barbero.nombre}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Selecciona la hora</h2>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="grid grid-cols-3 gap-4 mt-4">
              {horarios.map((hora, index) => (
                <div
                  key={index}
                  id={String(hora.hora)}
                  // onClick={handleManejarHorario}
                  onClick={() => setHoraSeleccionada(hora.hora_inicio)}
                  className={`min-w-[100px] min-h-[40px] flex items-center justify-center rounded-lg shadow-lg flex-col space-y-1 active:scale-95 transform duration-75 cursor-pointer select-none card-hora ${
                    horaSeleccionada === hora.hora_inicio
                      ? "bg-green-800/80 text-white cursor-pointer"
                      : // : String(hora.hora) === formData.hora_inicio
                        // ? "bg-green-800/80 text-white cursor-pointer"
                        "bg-blue-white hover:bg-blue-800/80 hover:text-white cursor-pointer"
                  }`}
                >
                  <span className="text-sm">
                    {new Date(hora.hora_inicio).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h2 className="text-xl font-bold">Datos del cliente</h2>
          </div>
          <form className="w-full mt-4 flex flex-col items-center gap-4 card-contacto">
            <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative w-full">
              <span className="text-xs bg-zinc-100 absolute left-4 -top-2 px-2 text-zinc-800">
                Nombre
              </span>
              <div className="relative flex items-center gap-4">
                <BsFillPersonFill className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Marcos Pérez"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      nombre: e.target.value,
                    });
                  }}
                  required
                  name="nombre"
                  className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                />
              </div>
            </div>
            <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative w-full">
              <span className="text-xs bg-zinc-100 absolute left-4 -top-2 px-2 text-zinc-800">
                Telefono
              </span>
              <div className="relative flex items-center gap-4">
                <IoPhonePortraitOutline className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="3002888529"
                  value={formData.telefono}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      telefono: e.target.value,
                    });
                  }}
                  required
                  name="telefono"
                  className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center w-full justify-center my-5 pb-20">
              <button
                className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-zinc-800 transition duration-300 card-confirmar active:scale-95 transform cursor-pointer select-none text-sm"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Confirmar reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reservar;
