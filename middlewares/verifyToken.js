const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'super_secreta_123';

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error("Erro na verificação do token:", err.message);
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
    req.user = decoded;
    next();
  });
};
