import { JSX } from "react";
import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { LiaFileAlt } from "react-icons/lia";
import { PiCalendarCheckDuotone } from "react-icons/pi";

export interface navfooterInterface {
  id: string;
  title: string;
  url: string;
  icon: JSX.Element;
}

export const navfooter: navfooterInterface[] = [
  {
    id: "inicio",
    title: "Inicio",
    url: "/",
    icon: <BiHome />,
  },
  {
    id: "reservas",
    title: "Reservar",
    url: "/reservar",
    icon: <PiCalendarCheckDuotone />,
  },
  {
    id: "mis-pedidos",
    title: "Mis Pedidos",
    url: "/mis-pedidos",
    icon: <LiaFileAlt />,
  },
  {
    id: "perfil",
    title: "Perfil",
    url: "/perfil",
    icon: <BsPerson />,
  },
];
