import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma.utils.js";
import moment from "moment";

// @desc Return all invoices
// @route GET /api/invoices
// @access Private
export const index = asyncHandler(async (req, res) => {
  const invoices = await prisma.invoice.findMany({
    include: {
      cashier: true,
      coupon: true,
      client: true,
      services: {
        include: {
          user: true,
          service: true,
          invoice: true,
        },
      },
    },
  });

  invoices.forEach((invoice) => {
    invoice.services = invoice.services.map((row) => {
      return {
        service: row.service,
        user: row.user,
        price: row.price,
      };
    });
  });

  res.status(200).json(invoices);
});

// @desc Create a new invoice
// @route POST /api/invoices
// @access Private
export const store = asyncHandler(async (req, res) => {
  const {
    client_id,
    discount_amount,
    discount_unit,
    coupon_id,
    payment_method,
    notes,
    services,
    discount,
    bill_date,
    extra_charges,
    total,
    subtotal,
  } = req.body;

  const invoice = await prisma.invoice.create({
    data: {
      cashier_id: +req.user.id,
      client_id: +client_id,
      discount_amount: +discount_amount,
      discount_unit: discount_unit,
      discount: +discount,
      coupon_id: coupon_id ? +coupon_id : null,
      bill_date: new Date(bill_date),
      payment_method,
      extra_charges: +extra_charges,
      total: +total,
      subtotal: +subtotal,
      notes,
      services: {
        create: services.map((service) => {
          return {
            user_id: service.user_id,
            service_id: service.service_id,
            price: service.price,
          };
        }),
      },
    },
    include: {
      cashier: true,
      coupon: true,
      client: true,
      services: {
        include: {
          service: true,
          user: true,
        },
      },
    },
  });

  if (invoice) {
    invoice.details = invoice.services.map((service) => {
      return {
        service: service.service,
        user: service.user,
        price: service.price,
      };
    });

    res.status(201).json(invoice);
  } else {
    res.status(400);
    throw new Error("Invalid invoice data");
  }
});

// @desc Get invoice by id
// @route GET /api/invoices/:id
// @access Private
export const show = asyncHandler(async (req, res) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      cashier: true,
      coupon: true,
      client: true,
      services: {
        include: {
          user: true,
          service: true,
          invoice: true,
        },
      },
    },
  });

  if (invoice) {
    invoice.services = invoice.services.map((row) => {
      return {
        service: row.service,
        user: row.user,
        price: row.price,
      };
    });

    res.json(invoice);
  } else {
    res.status(404);
    throw new Error("Invoice not found");
  }
});

// @desc Update an existing invoice
// @route PUT /api/invoices/:id
// @access Private
export const update = asyncHandler(async (req, res) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      cashier: true,
      coupon: true,
      client: true,
      services: true,
    },
  });

  if (invoice) {
    invoice.name = req.body.name || invoice.name;

    const permissions = req.body.permissions || invoice.permissions;

    const updatedInvoice = await prisma.invoice.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name || invoice.name,
        permissions: {
          set: permissions.map((permissionId) => {
            return {
              id: +permissionId,
            };
          }),
        },
      },
      include: {
        permissions: true,
      },
    });

    res.json(updatedInvoice);
  } else {
    res.status(404);

    throw new Error("Invoice not found");
  }
});

// @desc Delete a invoice
// @route DELETE /api/invoices/:id
// @access Private
export const destroy = asyncHandler(async (req, res) => {
  try {
    await prisma.invoicesOnServices.deleteMany({
      where: {
        invoice_id: +req.params.id,
      },
    });

    await prisma.invoice.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({
      messsage: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(404);

    throw new Error("Invoice not found");
  }
});
