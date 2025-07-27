interface Dias {
  [key: string]: string;
}

export const obtenerDosLetras = (dia: string): string | undefined => {
  const dias: Dias = {
    domingo: "Do",
    lunes: "Lu",
    martes: "Ma",
    miércoles: "Mi",
    jueves: "Ju",
    viernes: "Vi",
    sábado: "Sa",
  };

  return dias[dia.toLowerCase()];
};
