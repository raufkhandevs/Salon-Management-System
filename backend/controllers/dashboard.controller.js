import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma.utils.js";

// @desc Return all Dashboard Reports
// @route GET /api/dashboard
// @access Private
export const index = asyncHandler(async (req, res) => {
  const today = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));

  const month = new Date(
    new Date(new Date(Date.now()).setDate(1)).setHours(0, 0, 0, 0)
  );

  const invoices = await prisma.invoice.findMany({
    include: {
      client: true,
    },
    orderBy: {
      bill_date: "desc",
    },
    take: 5,
  });

  const clients = await prisma.client.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });

  const invoicesOverall = await prisma.invoice.aggregate({
    _sum: {
      total: true,
    },
  });

  const invoicesToday = await prisma.invoice.aggregate({
    _sum: {
      total: true,
    },
    where: {
      bill_date: {
        gte: today,
      },
    },
  });

  const clientsOverall = await prisma.client.aggregate({
    _count: true,
  });

  const clientsThisMonth = await prisma.client.aggregate({
    _count: true,
    where: {
      created_at: {
        gte: month,
      },
    },
  });

  res.status(200).json({
    totalSales: invoicesOverall._sum.total,
    totalSalesToday: invoicesToday._sum.total,
    totalClients: clientsOverall._count,
    clientsThisMonth: clientsThisMonth._count,
    clients,
    invoices,
  });
});
