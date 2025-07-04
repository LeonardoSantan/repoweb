// Middleware para restringir acesso por tipo de usuário (role)
module.exports = function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !allowedRoles.includes(user.tipo || user.role)) {
      return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
    }
    next();
  };
};
