import bcrypt from "bcrypt";

export const getHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
}