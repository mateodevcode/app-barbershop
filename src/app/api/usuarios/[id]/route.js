import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import Usuario from "@/models/usuario";

export async function GET(_request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    const UsuarioEncontrado = await Usuario.findById(id);

    if (!UsuarioEncontrado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(UsuarioEncontrado);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ocurrió un error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const data = await request.json();

    const UsuarioActualizado = await Usuario.findByIdAndUpdate(id, data, {
      new: true,
    });

    return new Response(
      JSON.stringify({
        message: "Usuario actualizado correctamente",
        user: UsuarioActualizado,
      }),
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ocurrió un error";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const UsuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!UsuarioEliminado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "El Usuario se ha eliminado con éxito",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ocurrió un error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    const { password } = await request.json();
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

    const usuarios = await Usuario.find();

    return new Response(
      JSON.stringify({
        title: "Contraseña restablecida con éxito",
        message: "Tu contraseña ha sido actualizada correctamente.",
        users: usuarios,
      }),
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ocurrió un error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
