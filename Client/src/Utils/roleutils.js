export const hasRole = (user, requiredRole) => {
  if (!user) return false;
  return user.role === requiredRole;
};
