// src/app/api/upload/perfil/route.js

import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { formatearNombreMayus } from "@/utils/formatearNombreMayus";
import Usuario from "@/models/usuario";
import { connectMongoDB } from "@/lib/db";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function fileToBuffer(file) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request) {
  await connectMongoDB();

  const formData = await request.formData();
  const file = formData.get("file");
  const name = formData.get("name");
  const password = formData.get("password");
  const telefono = formData.get("telefono");
  const direccion = formData.get("direccion");
  const usuarioId = formData.get("usuarioId");
  const opcion = formData.get("opcion");

  if (!opcion || (opcion === "editar" && !usuarioId)) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  try {
    let uploadResponse = null;
    let oldPublicId = null;

    // Si hay imagen, validar y subir
    if (file && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Solo se permiten imágenes" },
          { status: 400 }
        );
      }
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: "Máx 2MB" }, { status: 400 });
      }

      const buffer = await fileToBuffer(file);
      const fileName = `usuario_${name || "imagen"}_${Date.now()}.jpg`;

      // Si estamos editando, obtener publicId anterior para eliminar
      if (opcion === "editar") {
        const pro = await Usuario.findById(usuarioId);
        if (!pro)
          return NextResponse.json(
            { error: "Usuario no encontrado" },
            { status: 404 }
          );
        oldPublicId = pro.publicId;
      }

      uploadResponse = await imagekit.upload({
        file: buffer,
        fileName,
        folder: "/bsapp_usuarios",
        useUniqueFileName: false,
        transformation: {
          pre: "c-at_least,h-500,w-500",
        },
      });
    }

    // CREAR
    if (opcion === "crear") {
      if (!name || !uploadResponse) {
        return NextResponse.json(
          { error: "Nombre e imagen requeridos para crear" },
          { status: 400 }
        );
      }

      const nuevoUsuario = await Usuario.create({
        name: formatearNombreMayus(name),
        password,
        telefono: telefono,
        direccion,
        imageUrl: uploadResponse.url,
        publicId: uploadResponse.fileId,
      });

      return NextResponse.json(
        { message: "Usuario creado", usuario: nuevoUsuario },
        { status: 200 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (name) {
        updates.name = formatearNombreMayus(name);
      }
      if (password) {
        updates.password = password;
      }
      if (telefono) {
        updates.telefono = telefono;
      }
      if (direccion) {
        updates.direccion = formatearNombreMayus(direccion);
      }
      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.imageUrl = uploadResponse.url;
      }
      const updated = await Usuario.findByIdAndUpdate(usuarioId, updates, {
        new: true,
      });

      // Eliminar imagen anterior si se subió una nueva
      if (uploadResponse && oldPublicId) {
        try {
          await imagekit.deleteFile(oldPublicId);
        } catch (e) {
          console.warn("No se eliminó imagen anterior:", e.message);
        }
      }

      return NextResponse.json(
        { message: "Usuario actualizado", usuario: updated },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Opción no válida" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error en el servidor", details: err.message },
      { status: 500 }
    );
  }
}
