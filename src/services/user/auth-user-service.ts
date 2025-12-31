import "dotenv/config";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });
    const isUserNotExists = !user;

    if (isUserNotExists) {
      throw new Error("Invalid e-mail or password.");
    }

    const isPasswordMatch = await compare(password, user.password);
    const isNotPasswordMatch = !isPasswordMatch;

    if (isNotPasswordMatch) {
      throw new Error("Incorrect e-mail or password.");
    }

    // generate JWT
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}
