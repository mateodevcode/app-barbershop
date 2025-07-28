"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosPhonePortrait } from "react-icons/io";
import { RiMapPin2Fill } from "react-icons/ri";
import { BsCameraFill, BsPerson, BsPersonGear } from "react-icons/bs";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { UsuarioInterface } from "@/types/Usuario";
import { FiLock } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Configuracion = () => {
  const router = useRouter();
  const { formDatosUausuario, setFormDatosUsuario, usuario, setUsuarios } =
    useAppContext();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [usuarioInicial, setUsuarioInicial] = useState<UsuarioInterface | null>(
    null
  );
  const [verContraseña, setVerContraseña] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDatosUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (usuario) {
      setUsuarioInicial(usuario);
      setFormDatosUsuario({
        name: usuario.name || "",
        password: usuario.password || "",
        telefono: usuario.telefono || "",
        direccion: usuario.direccion || "",
        imageUrl: usuario.imageUrl || "",
        publicId: usuario.publicId || "",
        opcion: "editar",
      });
      setPreview(usuario.imageUrl || null);
    }
  }, [usuario, setFormDatosUsuario]);

  const handleChangeFile = (e: React.FormEvent) => {
    const input = e.target as HTMLInputElement;
    const selectedFile = input.files && input.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("name", formDatosUausuario.name);
    formData.append("password", formDatosUausuario.password);
    formData.append("telefono", formDatosUausuario.telefono);
    formData.append("direccion", formDatosUausuario.direccion);
    formData.append("opcion", formDatosUausuario.opcion);
    if (formDatosUausuario.opcion === "editar" && usuario?._id) {
      formData.append("usuarioId", String(usuario._id));
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/upload/perfil`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast.success("Datos actualizados correctamente");
        const data = await res.json();
        const updatedUser = data.usuario;
        setUsuarios((prev) =>
          prev.map((user) =>
            user._id === updatedUser._id ? { ...user, ...updatedUser } : user
          )
        );
        setFormDatosUsuario({
          name: "",
          password: "",
          telefono: "",
          direccion: "",
          imageUrl: "",
          publicId: "",
          opcion: "",
        });
        router.push("/perfil");
        setFile(null);
        setPreview(null);
      } else {
        throw new Error("Error al actualizar los datos del usuario");
      }
    } catch (error) {
      toast.error("Error al actualizar los datos del usuario", {
        description:
          error instanceof Error ? error.message : "Error desconocido",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: `url('/perfil/fondo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-11/12 flex flex-col items-start justify-center relative">
        <div className="flex items-center justify-between py-4 w-full sticky top-0 left-0 z-20">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none bg-white rounded-full p-2 active:scale-95 duration-75 w-10 h-10 flex items-center justify-center"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-200 select-none">
            Configuración
          </h3>
          <button className="text-zinc-800 select-none bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <BsPersonGear className="text-2xl" />
          </button>
        </div>
        <form className="p-4 w-full h-[88svh] mt-5">
          <div className="h-[70svh] bg-white rounded-lg shadow-md flex flex-col items-center justify-start py-8 md:py-20">
            <div className="flex flex-col items-center justify-center w-24 h-24 relative">
              <Image
                src={preview || usuario?.imageUrl || "/perfil/usuario.jpg"}
                alt="Usuario"
                width={500}
                height={500}
                className="rounded-full mb-4"
              />
              <div className="w-10 h-10 absolute bottom-0 right-0 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-zinc-200 transition-colors text-white p-2 select-none active:scale-95 duration-150 overflow-hidden">
                <BsCameraFill className="text-blue-600 pointer-events-none cursor-pointer" />
                <input
                  id="cameraInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="absolute inset-0 opacity-0 cursor-pointer peer"
                  onChange={handleChangeFile}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <span className="text-2xl font-bold">Mateo Lizcano</span>
            </div>

            <div className="flex flex-col items-center justify-start w-full gap-4">
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Nombre de usuario
                </span>
                <div className="relative flex items-center gap-4">
                  <BsPerson className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    type="name"
                    placeholder="Marcos Gonzalez"
                    onChange={handleChange}
                    value={formDatosUausuario.name}
                    required
                    name="name"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Numero de telefono
                </span>
                <div className="relative flex items-center gap-4">
                  <IoIosPhonePortrait className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    type="telefono"
                    placeholder="300-288-8529"
                    onChange={handleChange}
                    value={formDatosUausuario.telefono}
                    required
                    name="telefono"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Contraseña
                </span>
                <div className="relative flex items-center gap-4">
                  <FiLock className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    type={verContraseña ? "text" : "password"}
                    placeholder="*********"
                    onChange={handleChange}
                    value={formDatosUausuario.password}
                    required
                    name="password"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                  {verContraseña ? (
                    <button
                      className="h-4 w-4 text-muted-foreground text-rose-600 absolute right-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setVerContraseña(false);
                      }}
                    >
                      <IoEyeOffOutline className="" />
                    </button>
                  ) : (
                    <button
                      className="h-4 w-4 text-muted-foreground text-rose-600 absolute right-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setVerContraseña(true);
                      }}
                    >
                      <IoEyeOutline />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid gap-2 border-[1px] border-zinc-200 rounded-lg px-4 py-3 relative">
                <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
                  Dirección
                </span>
                <div className="relative flex items-center gap-4">
                  <RiMapPin2Fill className="h-4 w-4 text-muted-foreground text-rose-600" />
                  <input
                    type="direccion"
                    placeholder="Calle 123, Barranquilla, Atlantico"
                    onChange={handleChange}
                    value={formDatosUausuario.direccion}
                    required
                    name="direccion"
                    className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer select-none active:scale-95 duration-75 text-sm"
              >
                Editar Perfil
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFormDatosUsuario({
                    name: "",
                    password: "",
                    telefono: "",
                    direccion: "",
                    imageUrl: "",
                    publicId: "",
                    opcion: "",
                  });
                }}
                className="px-6 py-2 border-[1px] text-blue-600 border-blue-600 hover:text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer select-none active:scale-95 duration-75 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Configuracion;
