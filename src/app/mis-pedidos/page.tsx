import MisPedidos from "@/components/mis-pedidos/MisPedidos";
import NavFooter from "@/components/nav-footer/NavFooter";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <MisPedidos />
      <NavFooter />
    </div>
  );
};

export default page;
