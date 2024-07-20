import bcrypt from "bcrypt";

export const comparePasswords = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
