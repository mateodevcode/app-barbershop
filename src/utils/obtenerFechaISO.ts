// Mapa tipado (y utilizable como union si quieres algo más estricto)
const MESES = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
} as const;

export type MesNombre = keyof typeof MESES;

/**
 * Convierte `día + mes (es-ES) + año` a `YYYY-MM-DD` (ISO-like).
 * - Normaliza el mes (mayúsculas/minúsculas y acentos).
 * - Lanza error si el mes es inválido.
 */
export function obtenerFechaISO(
  dia: number | string,
  mes: string,
  anio: number = new Date().getFullYear()
): string {
  const diaNum = Number(dia);
  if (!Number.isInteger(diaNum) || diaNum < 1 || diaNum > 31) {
    throw new Error(`"dia" inválido: ${dia}`);
  }

  // normaliza: minúsculas + elimina acentos
  const mesNormalizado = mes
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // ej: "Márzo" -> "marzo"

  const mesNumero = (MESES as Record<string, number>)[mesNormalizado];
  if (!mesNumero) {
    throw new Error(`Mes inválido: "${mes}"`);
  }

  const m = String(mesNumero).padStart(2, "0");
  const d = String(diaNum).padStart(2, "0");

  return `${anio}-${m}-${d}`;
}
