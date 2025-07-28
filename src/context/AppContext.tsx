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
import { useSession } from "next-auth/react";
import { UsuarioInterface } from "@/types/Usuario";

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

  usuarios: UsuarioInterface[];
  setUsuarios: React.Dispatch<React.SetStateAction<UsuarioInterface[]>>;

  usuario: UsuarioInterface | null;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioInterface | null>>;

  formDatosUausuario: {
    name: string;
    password: string;
    telefono: string;
    direccion: string;
    imageUrl: string;
    publicId: string;
    opcion: string;
  };
  setFormDatosUsuario: React.Dispatch<
    React.SetStateAction<{
      name: string;
      password: string;
      telefono: string;
      direccion: string;
      imageUrl: string;
      publicId: string;
      opcion: string;
    }>
  >;
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
  const { data: session } = useSession();
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
  const [usuarios, setUsuarios] = useState<UsuarioInterface[]>([]);
  const [usuario, setUsuario] = useState<UsuarioInterface | null>(null);
  const [formDatosUausuario, setFormDatosUsuario] = useState({
    name: "",
    password: "",
    telefono: "",
    direccion: "",
    imageUrl: "",
    publicId: "",
    opcion: "editar",
  });

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

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("/api/usuarios");
        if (!response.ok) throw new Error("Error fetching usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchUsuario = async () => {
      // Busca el usuario por email en vez de id, ya que session?.user?.id no existe
      if (!session?.user) return;
      const user = usuarios.find(
        (u) => String(u.email) === String(session.user?.email)
      );
      if (user) {
        setUsuario(user);
      }
    };
    fetchUsuario();
  }, [usuarios, session]);

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
        usuarios,
        setUsuarios,
        usuario,
        setUsuario,
        formDatosUausuario,
        setFormDatosUsuario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
