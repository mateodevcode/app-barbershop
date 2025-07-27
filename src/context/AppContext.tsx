"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ReservaInterface } from "@/types/Reserva";
import { BarberoInterface } from "@/types/Barbero";
import { ServicioInterface } from "@/types/Servicio";

// ──────────────────────────────
// Tipos (ajústalos a tu API real)
// ──────────────────────────────

interface AppContextValue {
  openModalServicioSeleccionado: boolean;
  setOpenModalServicioSeleccionado: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  servicioSeleccionado: ServicioInterface | null;
  setServicioSeleccionado: React.Dispatch<
    React.SetStateAction<ServicioInterface | null>
  >;

  openModalVerServicio: boolean;
  setOpenModalVerServicio: React.Dispatch<React.SetStateAction<boolean>>;

  reservas: ReservaInterface[];
  setReservas: React.Dispatch<React.SetStateAction<ReservaInterface[]>>;

  barberos: BarberoInterface[];
  setBarberos: React.Dispatch<React.SetStateAction<BarberoInterface[]>>;

  openModalConfirmacionReserva: boolean;
  setOpenModalConfirmacionReserva: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  reservaConfirmada: ReservaInterface | null;
  setReservaConfirmada: React.Dispatch<
    React.SetStateAction<ReservaInterface | null>
  >;

  openModalNotificaciones: boolean;
  setOpenModalNotificaciones: React.Dispatch<React.SetStateAction<boolean>>;

  openModalMenuHamburguesa: boolean;
  setOpenMenuHamburguesa: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextValue | null>(null);

// Hook seguro para consumir el contexto
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext debe usarse dentro de <AppProvider />");
  return ctx;
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [openModalServicioSeleccionado, setOpenModalServicioSeleccionado] =
    useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] =
    useState<ServicioInterface | null>(null);
  const [openModalVerServicio, setOpenModalVerServicio] = useState(false);
  const [reservas, setReservas] = useState<ReservaInterface[]>([]);
  const [barberos, setBarberos] = useState<BarberoInterface[]>([]);
  const [openModalConfirmacionReserva, setOpenModalConfirmacionReserva] =
    useState(false);
  const [reservaConfirmada, setReservaConfirmada] =
    useState<ReservaInterface | null>(null);
  const [openModalNotificaciones, setOpenModalNotificaciones] =
    useState<boolean>(false);
  const [openModalMenuHamburguesa, setOpenMenuHamburguesa] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch("/api/reservas");
        if (!response.ok) throw new Error("Error fetching reservas");
        const data: ReservaInterface[] = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Error fetching reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  useEffect(() => {
    const fetchBarberos = async () => {
      try {
        const response = await fetch("/api/barberos");
        if (!response.ok) throw new Error("Error fetching barberos");
        const data: BarberoInterface[] = await response.json();
        setBarberos(data);
      } catch (error) {
        console.error("Error fetching barberos:", error);
      }
    };

    fetchBarberos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        openModalServicioSeleccionado,
        setOpenModalServicioSeleccionado,
        servicioSeleccionado,
        setServicioSeleccionado,
        reservas,
        setReservas,
        barberos,
        setBarberos,
        openModalVerServicio,
        setOpenModalVerServicio,
        openModalConfirmacionReserva,
        setOpenModalConfirmacionReserva,
        reservaConfirmada,
        setReservaConfirmada,
        openModalNotificaciones,
        setOpenModalNotificaciones,
        openModalMenuHamburguesa,
        setOpenMenuHamburguesa,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
