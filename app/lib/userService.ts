import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserWithRelations(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        sold_services: {
          orderBy: {
            date: "desc",
          },
        },
        ctr: {
          orderBy: {
            date: "desc",
          },
        },
        accounts: true,
        sessions: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function getUserStats(userId: number) {
  try {
    const [
      totalSoldServices,
      totalRevenue,
      totalCtrRecords,
      totalTimeSpent,
      recentServices,
      recentCtr,
    ] = await Promise.all([
      prisma.sold_services.count({
        where: { userId },
      }),
      prisma.sold_services.aggregate({
        where: { userId },
        _sum: { price: true },
      }),
      prisma.ctr.count({
        where: { userId },
      }),
      prisma.ctr.aggregate({
        where: { userId },
        _sum: { time_spent: true },
      }),
      prisma.sold_services.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        take: 5,
      }),
      prisma.ctr.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        take: 5,
      }),
    ]);

    return {
      totalSoldServices,
      totalRevenue: totalRevenue._sum.price || 0,
      totalCtrRecords,
      totalTimeSpent: totalTimeSpent._sum.time_spent || 0,
      recentServices,
      recentCtr,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
}
