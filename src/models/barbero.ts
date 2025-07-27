import { BarberoInterface } from "@/types/Barbero";
import mongoose, { Schema, type Model } from "mongoose";

const BarberoSchema = new Schema<BarberoInterface>(
  {
    nombre: { type: String, required: true },
    imagen: { type: String, default: "" },
    telefono: { type: String, default: "" },
    horario: {
      lunes: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
      martes: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
      miercoles: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
      jueves: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
      viernes: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
      sabado: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
      domingo: {
        inicio: { type: String, default: "08:00" },
        fin: { type: String, default: "17:00" },
      },
    },
  },
  { timestamps: true }
);

export const Barbero: Model<BarberoInterface> =
  mongoose.models.Barbero ||
  mongoose.model<BarberoInterface>("Barbero", BarberoSchema);

export default Barbero;
