import bcrypt from "bcrypt";

export async function validatePassword(password: string, userPassword: string) {
  const validatePassword: boolean = await bcrypt.compare(
    password,
    userPassword
  );
  return validatePassword;
}
