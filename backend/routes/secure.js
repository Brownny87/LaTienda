import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/perfil", verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, tu ID es ${req.user.id}` });
});

export default router;
