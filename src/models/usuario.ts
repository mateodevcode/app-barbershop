import { UsuarioInterface } from "@/types/Usuario";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UsuarioSchema = new Schema<UsuarioInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    telefono: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    direccion: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    estado: {
      type: String,
      default: "pendiente",
    },
    intentosFallidos: {
      type: Number,
      default: 0,
    },
    bloqueado: {
      type: Boolean,
      default: false,
    },
    codigoVerificacion: {
      type: String,
      default: "",
    },
    dateCodigoVerificacion: {
      type: Date,
      default: Date.now,
    },
    rol: {
      type: String,
      enum: ["cliente", "administrador"],
      default: "cliente",
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = models.Usuario || model("Usuario", UsuarioSchema);
export default Usuario;
