import NavFooter from "@/components/nav-footer/NavFooter";
import Servicios from "@/components/pageServicios/Servicios";
import ModalServicioSeleccionado from "@/components/servicios/ModalServicioSeleccionado";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Servicios />
      <NavFooter />
      <ModalServicioSeleccionado />
    </div>
  );
};

export default page;
