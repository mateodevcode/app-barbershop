export const formatoFecha = (
  fecha: string | Date | null | undefined
): string => {
  if (!fecha) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: false,
  };

  return new Date(fecha).toLocaleDateString("es-ES", options);
};

export const formatoHora = (
  fecha: string | Date | null | undefined
): string => {
  if (!fecha) return "";

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Cambia a false si prefieres el formato de 24 horas
  };

  return new Date(fecha).toLocaleTimeString("es-ES", options);
};

export const formatoFechaCorta = (
  fecha: string | Date | null | undefined
): string => {
  if (!fecha) return "";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Date(fecha).toLocaleDateString("es-ES", options);
};
