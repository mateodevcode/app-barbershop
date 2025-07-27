export interface Barberia {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
}

export const barberias: Barberia[] = [
  {
    id: 1,
    name: "Barbería Blessed by God",
    address: "Calle Falsa 123, Camelot, Soledad, Atlantico",
    imageUrl: "/ubicacion/barberia-camelot.png",
  },
];
