import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function validatePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed).then((isEqual) => {
    return isEqual;
  });
}

export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, SALT_ROUNDS);
}
