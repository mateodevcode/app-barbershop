import React from "react";
import Servicios from "@/components/servicios/Servicios";
import Opciones from "@/components/opciones/Opciones";
import Barberias from "@/components/barberias/Barberias";
import NavFooter from "@/components/nav-footer/NavFooter";
import Presentacion from "@/components/presentacion/Presentacion";
import Header from "@/components/header/Header";
import BannerPromocional from "@/components/banner-promocional/BannerPromocional";
import ModalConfirmacionReserva from "@/components/reservar/ModalConfirmacionReserva";
import ModalVerServicio from "@/components/reservar/ModalVerServicio";
import ModalServicioSeleccionado from "@/components/servicios/ModalServicioSeleccionado";
import ModalNotificaciones from "@/components/notificaciones/ModalNotificaciones";
import MenuHamburguesa from "@/components/menu-hamburguesa/MenuHamburguesa";
import Loading from "@/components/loading/Loading";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Header />
      <Presentacion />
      <BannerPromocional />
      <Servicios />
      <Opciones />
      <Barberias />
      <NavFooter />
      <ModalConfirmacionReserva />
      <ModalVerServicio />
      <ModalServicioSeleccionado />
      <ModalNotificaciones />
      <MenuHamburguesa />
      <Loading />
    </div>
  );
};

export default page;
