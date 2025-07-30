import { ReservaInterface } from "@/types/Reserva";

export function reservasSchema(data: ReservaInterface): string[] {
  const errores: string[] = [];

  if (!data.fecha || isNaN(new Date(data.fecha).getTime())) {
    errores.push("Se requiere una fecha para la reserva");
  }

  if (data.servicio_id === "") {
    errores.push("Selecciona un servicio para la reserva");
  }

  if (!data.barbero_id) {
    errores.push("Selecciona un barbero para la reserva, por favor.");
  }

  if (!data.cliente_nombre || data.cliente_nombre.trim() === "") {
    errores.push("Ingresa tu nombre, por favor.");
  }

  if (!data.cliente_telefono || data.cliente_telefono.trim() === "") {
    errores.push("Ingresa tu número de teléfono, por favor.");
  }

  return errores;
}
