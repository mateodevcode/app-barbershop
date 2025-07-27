import MisReservas from "@/components/mis-reservas/MisReservas";
import NavFooter from "@/components/nav-footer/NavFooter";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <MisReservas />
      <NavFooter />
    </div>
  );
};

export default page;
