import prisma from '../db/db';
import { compare, hash } from 'bcryptjs';
export default class AuthRepository {
  constructor() {}
  async comparePassword(password, hash) {
    return await compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }
}
