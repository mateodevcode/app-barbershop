import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import Usuario from "@/models/usuario";

// GET: Obtener usuario por ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// PUT: Actualizar usuario completo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const data = await request.json();

    const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuario actualizado correctamente", user: usuario },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// DELETE: Eliminar usuario
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "El usuario se ha eliminado con éxito" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// PATCH: Restablecer contraseña
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();

    const { password }: { password: string } = await request.json();
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    usuario.password = hashedPassword;
    usuario.codigoVerificacion = "";
    usuario.intentosFallidos = 0;
    usuario.bloqueado = false;
    await usuario.save();

    const usuarios = await Usuario.find(); // Solo si necesitas devolver todos

    return NextResponse.json(
      {
        title: "Contraseña restablecida con éxito",
        message: "Tu contraseña ha sido actualizada correctamente.",
        users: usuarios,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
