import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import Usuario from "@/models/usuario";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const UsuarioEncontrado = await Usuario.findById(params.id);

    if (!UsuarioEncontrado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(UsuarioEncontrado);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const data = await request.json();

    const UsuarioActualizado = await Usuario.findByIdAndUpdate(
      params.id,
      data,
      {
        new: true,
      }
    );

    return new Response(
      JSON.stringify({
        message: "Usuario actualizado correctamente",
        user: UsuarioActualizado,
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const UsuarioEliminado = await Usuario.findByIdAndDelete(params.id);

    if (!UsuarioEliminado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "El Usuario se ha eliminado con éxito",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const { password }: { password: string } = await request.json();
    const usuario = await Usuario.findById(params.id);

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

    const usuarios = await Usuario.find();

    return new Response(
      JSON.stringify({
        title: "Contraseña restablecida con éxito",
        message: "Tu contraseña ha sido actualizada correctamente.",
        users: usuarios,
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
