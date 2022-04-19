import { Router } from "express";
const router = Router();
import db from "../database/createConnection.js"

router.get("/api/nonipas", async (req, res) => {
    const nonipas = await db.all("SELECT * FROM nonipas;");

    res.send({ data: nonipas })
});

export default router;