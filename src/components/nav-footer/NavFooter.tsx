"use client";

import { navfooter } from "@/data/navfooter";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavFooter = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="h-16 bg-white w-full fixed bottom-0 rounded-t-2xl z-30 ">
      <div className="grid grid-cols-4 gap-4 items-center justify-items-center shadow-lg p-4">
        {navfooter.map((item, index) => (
          <button
            type="button"
            onClick={() => router.push(item.url)}
            key={index}
            className={`w-20 cursor-pointer select-none flex flex-col items-center justify-center ${
              item.url === path
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl hover:text-blue-600">{item.icon}</div>
              <span className="text-xs font-semibold">{item.title}</span>
            </div>
            {item.url === path ? (
              <div className="w-8/12 h-1 bg-blue-600 rounded-full mt-1 rounded-b-2xl" />
            ) : (
              <div className="w-1/2 h-1 rounded-full mt-1 rounded-b-2xl" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavFooter;
