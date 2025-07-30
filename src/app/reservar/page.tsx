import Loading from "@/components/loading/Loading";
import NavFooter from "@/components/nav-footer/NavFooter";
import ModalConfirmacionReserva from "@/components/reservar/ModalConfirmacionReserva";
import Reservar from "@/components/reservar/Reservar";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Suspense fallback={<Loading />}>
        <Reservar />
      </Suspense>
      <ModalConfirmacionReserva />
      <Loading />
      <NavFooter />
    </div>
  );
};

export default page;
