import Configuracion from "@/components/configuracion/Configuracion";
import NavFooter from "@/components/nav-footer/NavFooter";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Configuracion />
      <NavFooter />
    </div>
  );
};

export default page;
