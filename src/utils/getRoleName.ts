export const getRoleName = (role: string) => {
  switch (role) {
    case "admin":
      return "Administrator";
    case "lecturer":
      return "Prelegent";
    case "user":
      return "";
    default:
      return "Unknown role";
  }
};
