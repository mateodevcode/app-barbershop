import NavFooter from "@/components/nav-footer/NavFooter";
import Reservar from "@/components/reservar/Reservar";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Suspense fallback={<div>Loading...</div>}>
        <Reservar />
      </Suspense>
      <NavFooter />
    </div>
  );
};

export default page;
