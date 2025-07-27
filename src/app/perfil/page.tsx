import NavFooter from "@/components/nav-footer/NavFooter";
import Perfil from "@/components/perfil/Perfil";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Perfil />
      <NavFooter />
    </div>
  );
};

export default page;
