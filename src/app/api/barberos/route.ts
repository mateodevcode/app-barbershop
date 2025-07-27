// app/api/barberos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Barbero from "@/models/barbero";

export async function GET() {
  try {
    await connectMongoDB();
    const barberos = await Barbero.find().lean();
    return NextResponse.json(barberos, { status: 200 });
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
    const nuevoBarbero = await Barbero.create(body);
    return NextResponse.json(nuevoBarbero, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
