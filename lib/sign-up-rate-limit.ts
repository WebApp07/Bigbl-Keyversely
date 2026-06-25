import { prisma } from "@/db/prisma";

export async function checkSignupRateLimit(ip: string) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const attempts = await prisma.signupAttempt.count({
    where: {
      ip,
      createdAt: {
        gte: oneHourAgo,
      },
    },
  });

  return attempts < 3;
}

export async function recordSignupAttempt(ip: string, email: string) {
  await prisma.signupAttempt.create({
    data: {
      ip,
      email,
    },
  });
}
