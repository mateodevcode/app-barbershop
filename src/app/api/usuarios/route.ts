// app/api/usuarios/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";

export async function GET() {
  try {
    await connectMongoDB();
    const usuarios = await Usuario.find().lean();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json(); // confías en el schema de Mongoose
    const usuarioCreado = await Usuario.create(body);
    return NextResponse.json(usuarioCreado, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
