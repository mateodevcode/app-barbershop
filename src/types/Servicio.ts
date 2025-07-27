import { JSX } from "react";

export interface ServicioInterface {
  id: number;
  nombre: string;
  titulo: string;
  descripcion: string;
  duracion: number;
  precio: number;
  adicional?: string;
  imagen: string;
  imagen_icono: string;
  puntuacion: number;
  likes: number;
  icon?: JSX.Element;
}
