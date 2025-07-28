import { Types } from "mongoose";

export interface UsuarioInterface {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  telefono: string;
  imageUrl: string;
  direccion: string;
  publicId: string;
  estado: string;
  intentosFallidos: number;
  bloqueado: boolean;
  codigoVerificacion: string;
  dateCodigoVerificacion: Date;
  rol: string;
  createdAt: Date;
  updatedAt: Date;
}
