import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Barbero from "@/models/barbero";
import Reserva from "@/models/reserva";

interface Bloque {
  hora_inicio: Date;
  hora_fin: Date;
}

function getDayName(date: string): keyof typeof dias {
  const dias = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
  };
  const dayIndex = new Date(date).getDay();
  return Object.keys(dias)[dayIndex] as keyof typeof dias;
}

function generarBloquesHorario(
  inicio: Date,
  fin: Date,
  duracion: number
): Bloque[] {
  const bloques: Bloque[] = [];
  let actual = new Date(inicio);
  while (actual.getTime() + duracion * 60000 <= fin.getTime()) {
    const siguiente = new Date(actual.getTime() + duracion * 60000);
    bloques.push({ hora_inicio: new Date(actual), hora_fin: siguiente });
    actual = siguiente;
  }
  return bloques;
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const barberoId = searchParams.get("barberoId");
    const fecha = searchParams.get("fecha");
    const duracionStr = searchParams.get("duracion");

    if (!barberoId || !fecha || !duracionStr) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const duracion = parseInt(duracionStr);
    if (isNaN(duracion) || duracion <= 0) {
      return NextResponse.json({ error: "Duración inválida" }, { status: 400 });
    }

    const barbero = await Barbero.findById(barberoId);
    if (!barbero) {
      return NextResponse.json(
        { error: "Barbero no encontrado" },
        { status: 404 }
      );
    }

    const diaSemana = getDayName(fecha);
    const horarioDia = barbero.horario[diaSemana];

    if (!horarioDia) {
      return NextResponse.json(
        { error: "No trabaja ese día" },
        { status: 400 }
      );
    }

    const fechaInicio = new Date(`${fecha}T${horarioDia.inicio}:00`);
    const fechaFin = new Date(`${fecha}T${horarioDia.fin}:00`);

    const bloques = generarBloquesHorario(fechaInicio, fechaFin, duracion);

    const reservas = await Reserva.find({
      barbero_id: barberoId,
      fecha: new Date(fecha),
    });

    // Filtrar bloques ocupados
    const disponibles = bloques.filter((bloque) => {
      return !reservas.some((reserva) => {
        return (
          (bloque.hora_inicio >= reserva.hora_inicio &&
            bloque.hora_inicio < reserva.hora_fin) ||
          (bloque.hora_fin > reserva.hora_inicio &&
            bloque.hora_fin <= reserva.hora_fin) ||
          (reserva.hora_inicio >= bloque.hora_inicio &&
            reserva.hora_inicio < bloque.hora_fin)
        );
      });
    });

    return NextResponse.json(disponibles, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al obtener horarios" },
      { status: 500 }
    );
  }
}
