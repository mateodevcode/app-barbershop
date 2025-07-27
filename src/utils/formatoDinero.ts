export const formatoDinero = (cantidad?: number): string | undefined => {
  if (cantidad === undefined) {
    return;
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(cantidad);
};
