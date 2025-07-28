import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();

  const usuarios = await Usuario.find({});
  return NextResponse.json(usuarios);
}

export async function POST(request: NextResponse) {
  await connectMongoDB();

  try {
    const {
      name,
      email,
      password,
      telefono,
      imageUrl,
      direccion,
      publicId,
      estado,
      intentosFallidos,
      bloqueado,
      codigoVerificacion,
      dateCodigoVerificacion,
      rol,
    } = await request.json();

    const nuevoUsuario = await Usuario.create({
      name,
      email,
      password,
      telefono,
      imageUrl,
      direccion,
      publicId,
      estado,
      intentosFallidos,
      bloqueado,
      codigoVerificacion,
      dateCodigoVerificacion,
      rol,
    });

    return NextResponse.json(
      { message: "Usuario creado", usuario: nuevoUsuario },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
