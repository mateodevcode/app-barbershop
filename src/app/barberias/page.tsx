import NavFooter from "@/components/nav-footer/NavFooter";
import Barberias from "@/components/pageBarberias/Barberias";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-svh">
      <Barberias />
      <NavFooter />
    </div>
  );
};

export default page;
