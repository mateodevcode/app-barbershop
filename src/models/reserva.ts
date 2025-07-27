import { ReservaInterface } from "@/types/Reserva";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const ReservaSchema = new Schema<ReservaInterface>(
  {
    barbero_id: {
      type: Schema.Types.ObjectId,
      ref: "Barbero",
      required: true,
    },
    servicio_id: {
      type: String,
      required: true,
    },
    cliente_nombre: {
      type: String,
      required: true,
    },
    cliente_telefono: {
      type: String,
      required: true,
    },
    hora_inicio: {
      type: Date,
      required: true,
    },
    hora_fin: {
      type: Date,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmada", "cancelada"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

const Reserva = models.Reserva || model("Reserva", ReservaSchema);
export default Reserva;
