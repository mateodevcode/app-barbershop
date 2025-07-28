"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context/AppContext";

const Loading = () => {
  const { reservas, barberos } = useAppContext();
  const { status } = useSession();

  if (!reservas || !barberos) return null;
  return (
    <>
      {status === "loading" ? (
        <div className="bg-white max-w-screen flex items-center justify-center fixed inset-0 z-50 h-svh w-screen scrollbar-hidden">
          <div className="">
            <video
              src="/loading/bs.mp4"
              width={900}
              height={900}
              className="h-80 w-auto"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="flex items-center justify-center mt-4 font-semibold absolute text-sm bottom-4 left-0 right-0 text-center text-zinc-800 dark:text-zinc-200">
            <Link href="https://seventwo.tech" target="_blank">
              Desarrollado por <strong className="font-bold">Seventwo</strong>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
