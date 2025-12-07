import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  try {
    const { numero } = req.body;

    if (typeof numero !== "number") {
      return res.status(400).json({ error: "Debe enviar un número válido." });
    }

    const resultado = numero * 2;

    return res.status(200).json({
      mensaje: "Operación exitosa",
      numeroOriginal: numero,
      resultado
    });

  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
      detalle: `${error}`
    });
  }
}
