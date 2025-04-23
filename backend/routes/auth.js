import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Registro
router.post("/registro", async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    const existeUsuario = await User.findOne({ correo });
    if (existeUsuario) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const nuevoUsuario = await User.create({ nombre, correo, contraseña });

    const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      puntos: nuevoUsuario.puntos,
      token,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const esCorrecta = await usuario.compararContraseña(contraseña);
    if (!esCorrecta) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      puntos: usuario.puntos,
      token,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el login" });
  }
});

export default router;
