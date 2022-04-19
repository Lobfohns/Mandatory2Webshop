import { Router } from "express";
const router = Router();
import db from "../database/createConnection.js"

router.get("/api/ipas", async (req, res) => {
    const ipas = await db.all("SELECT * FROM ipas;");

    res.send({ data: ipas })
});

export default router;
