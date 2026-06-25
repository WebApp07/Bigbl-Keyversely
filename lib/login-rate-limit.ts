import { prisma } from "@/db/prisma";

export async function isLoginBlocked(ip: string, email: string) {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const attempts = await prisma.loginAttempt.count({
    where: {
      ip,
      email,
      createdAt: {
        gte: fifteenMinutesAgo,
      },
    },
  });

  return attempts >= 5;
}

export async function recordFailedLogin(ip: string, email: string) {
  await prisma.loginAttempt.create({
    data: {
      ip,
      email,
    },
  });
}
