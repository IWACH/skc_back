export const errorMessages = {
  es: {
    // Errores de autenticación/autorización
    unsentToken: "No se envió el token",
    invalidToken: "El token no es válido",
    unauthorized: "No está autorizado",
    
    // Errores de recursos no encontrados
    notFound: "No se encontró",
    typeNotFound: "Tipo no encontrado",
    userNotFound: "Usuario no encontrado",
    
    // Errores de Prisma
    P2002: "$0 ya existe",
    P2003: "Error en la relación: $0",
    P2004: "$0 no puede estar vacío",
    P2007: "La fecha no es válida",
    P2014: "El registro está siendo utilizado por otras entidades",
    P2025: "Registro no encontrado",
    
    // Errores generales
    defaultError: "Ha ocurrido un error",
    contactSupport: "Contáctanos para poder ayudarte",
  },
}; 