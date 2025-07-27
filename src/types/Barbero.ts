import { Types } from "mongoose";

export interface DiaHorario {
  inicio: string;
  fin: string;
}

export interface Horario {
  lunes: DiaHorario;
  martes: DiaHorario;
  miercoles: DiaHorario;
  jueves: DiaHorario;
  viernes: DiaHorario;
  sabado: DiaHorario;
  domingo: DiaHorario;
}

export interface BarberoInterface {
  _id: Types.ObjectId;
  nombre: string;
  imagen: string;
  telefono: string;
  horario: Horario;
  createdAt: Date;
  updatedAt: Date;
}
