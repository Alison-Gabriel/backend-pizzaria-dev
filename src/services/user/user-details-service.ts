import prismaClient from "../../prisma";

interface UserDetailsServiceProps {
  userId: string;
}

export class UserDetailsService {
  async execute({ userId }: UserDetailsServiceProps) {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    const isUserNotFounded = !user;

    if (isUserNotFounded) {
      throw new Error("User not founded.");
    }

    return user;
  }
}
