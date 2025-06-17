const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'super_secreta_123';

module.exports = function verifyToken(req, res, next) {
  const auth = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = decoded;        // { id, login, tipo }
    next();
  });
};
