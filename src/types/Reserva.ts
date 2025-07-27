import mongoose from "mongoose";

export interface ReservaInterface {
  barbero_id: mongoose.Types.ObjectId;
  servicio_id: string | undefined;
  cliente_nombre: string;
  cliente_telefono: string;
  hora_inicio: Date;
  hora_fin: Date;
  fecha: Date;
  estado: "pendiente" | "confirmada" | "cancelada";
}
