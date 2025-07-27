import Barberos from "@/components/barberos/Barberos";
import NavFooter from "@/components/nav-footer/NavFooter";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Barberos />
      <NavFooter />
    </div>
  );
};

export default page;
