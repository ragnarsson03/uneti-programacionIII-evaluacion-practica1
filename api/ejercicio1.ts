export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json({
      mensaje: "API del Ejercicio 1 funcionando correctamente 🚀",
      profesor: "Carlos Márquez",
    });
  }

  if (req.method === "POST") {
    const contentType = (req.headers && req.headers["content-type"]) || "";
    let animal = "No enviado";

    if (contentType.includes("application/json")) {
      animal = req.body && req.body.animal ? req.body.animal : animal;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const raw = typeof req.body === "string" ? req.body : "";
      if (raw) {
        const params = new URLSearchParams(raw);
        animal = params.get("animal") || animal;
      } else if (req.body && typeof req.body === "object") {
        animal = req.body.animal || animal;
      }
    } else {
      if (req.body && typeof req.body === "object") {
        animal = req.body.animal || animal;
      } else if (typeof req.body === "string") {
        const params = new URLSearchParams(req.body);
        animal = params.get("animal") || animal;
      }
    }

    return res.status(200).json({ recibido: animal });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
