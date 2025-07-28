// app/api/usuarios/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import Usuario from "@/models/usuario";

type RouteContext = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectMongoDB();
    const { id } = params;

    const usuarioEncontrado = await Usuario.findById(id);
    if (!usuarioEncontrado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuarioEncontrado, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    await connectMongoDB();
    const { id } = params;
    const data = await req.json();

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json(
      {
        message: "Usuario actualizado correctamente",
        user: usuarioActualizado,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectMongoDB();
    const { id } = params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "El usuario se ha eliminado con éxito" },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// Resetear contraseña
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await connectMongoDB();
    const { id } = params;
    const { password } = (await req.json()) as { password: string };

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

    const usuarios = await Usuario.find({});

    return NextResponse.json(
      {
        title: "Contraseña restablecida con éxito",
        message: "Tu contraseña ha sido actualizada correctamente.",
        users: usuarios,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ message }, { status: 500 });
  }
}
