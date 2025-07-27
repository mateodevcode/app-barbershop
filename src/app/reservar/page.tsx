import NavFooter from "@/components/nav-footer/NavFooter";
import Reservar from "@/components/reservar/Reservar";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Reservar />
      <NavFooter />
    </div>
  );
};

export default page;
