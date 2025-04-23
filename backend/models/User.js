import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  puntos: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Encriptar contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Comparar contraseña ingresada con la almacenada
userSchema.methods.compararContraseña = async function (contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

const User = mongoose.model("User", userSchema);
export default User;
