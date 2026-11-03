//Verificar Rutas para un poco mas de seguridad
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No hay token, permiso denegado' });

  try {
    const cifrado = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = cifrado.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido o expirado' }); // Error JWT del PDF
  }
};