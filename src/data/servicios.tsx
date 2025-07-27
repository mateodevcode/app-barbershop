import { Servicio } from "@/types/Servicio";
import Image from "next/image";

export const servicios: Servicio[] = [
  {
    id: 1,
    nombre: "Corte de cabello",
    titulo: "Corte de Cabello",
    descripcion: "Corte de cabello clásico",
    duracion: 20,
    precio: 14000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/prueba-1.jpg",
    imagen_icono: "/servicios/corte.png",
    puntuacion: 4.9,
    likes: 984,
    icon: (
      <Image
        src="/servicios/icon/corte-cabello.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 2,
    nombre: "Corte de Barba",
    titulo: "Corte de Barba",
    descripcion: "Corte de barba y bigote",
    duracion: 10,
    precio: 6000,
    adicional: "Incluye perfilado y recorte",
    imagen: "/servicios/prueba-2.jpg",
    imagen_icono: "/servicios/barba.png",
    puntuacion: 4.8,
    likes: 512,
    icon: (
      <Image
        src="/servicios/icon/barba.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 3,
    nombre: "(Combo 1) Corte y Barba",
    titulo: "Combo 1",
    descripcion: "Corte de cabello y barba",
    duracion: 35,
    precio: 20000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/combo-1.jpeg",
    imagen_icono: "/servicios/combo-1.png",
    puntuacion: 4.9,
    likes: 650,
    icon: (
      <Image
        src="/servicios/icon/combo-1.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 4,
    nombre: "(Combo 2) Corte de Cabello + Cejas + Linea",
    titulo: "Combo 2",
    descripcion: "Corte de cabello, cejas y linea",
    duracion: 25,
    precio: 16000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/prueba-3.jpg",
    imagen_icono: "/servicios/linea.png",
    puntuacion: 4.7,
    likes: 430,
    icon: (
      <Image
        src="/servicios/icon/combo-2.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 5,
    nombre: "(Combo 3) Corte de Cabello + Cejas + Barba + Linea",
    titulo: "Combo 3",
    descripcion: "Corte de cabello, cejas, barba y linea",
    duracion: 35,
    precio: 22000,
    adicional: "Incluye lavado y secado",
    imagen: "/servicios/prueba-1.jpg",
    imagen_icono: "/servicios/combo-3.png",
    puntuacion: 4.8,
    likes: 780,
    icon: (
      <Image
        src="/servicios/icon/combo-1.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 6,
    nombre: "Corte de Cejas",
    titulo: "Corte de Cejas",
    descripcion: "Corte de cejas y perfilado",
    duracion: 5,
    precio: 3000,
    adicional: "",
    imagen: "/servicios/prueba-2.jpg",
    imagen_icono: "/servicios/ceja.png",
    puntuacion: 4.5,
    likes: 200,
    icon: (
      <Image
        src="/servicios/icon/ceja.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
  {
    id: 7,
    nombre: "Corte de Linea",
    titulo: "Corte de Linea",
    descripcion: "Corte de linea y perfilado",
    duracion: 5,
    precio: 2000,
    adicional: "",
    imagen: "/servicios/prueba-2.jpg",
    imagen_icono: "/servicios/lineas.png",
    puntuacion: 4.3,
    likes: 150,
    icon: (
      <Image
        src="/servicios/icon/linea.png"
        alt="Corte de Cabello"
        width={200}
        height={200}
        className="w-20 h-20 object-cover rounded-full"
      />
    ),
  },
];
