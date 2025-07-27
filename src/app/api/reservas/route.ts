import { connectMongoDB } from "@/lib/db";
import Reserva from "@/models/reserva";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const reservas = await Reserva.find({});
    return NextResponse.json(reservas);
  } catch (error) {
    console.error("Error fetching reservas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectMongoDB();

  try {
    const {
      barbero_id,
      servicio_id,
      cliente_nombre,
      cliente_telefono,
      hora_inicio,
      hora_fin,
      estado,
      fecha,
    } = await request.json();

    const nuevaReserva = await Reserva.create({
      barbero_id,
      servicio_id,
      cliente_nombre,
      cliente_telefono,
      hora_inicio,
      hora_fin,
      estado,
      fecha, // Guardar la fecha como un objeto Date
    });

    return NextResponse.json(
      {
        message: "Reserva creada exitosamente",
        reserva: nuevaReserva,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la reserva", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
