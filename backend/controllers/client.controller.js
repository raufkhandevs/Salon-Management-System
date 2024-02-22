import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma.utils.js";

// @desc Return all clients
// @route GET /api/clients
// @access Private
export const index = asyncHandler(async (req, res) => {
  const clients = await prisma.client.findMany({
    include: {
      invoices: true,
    },
  });

  clients.forEach((client) => {
    client.total_sales = client.invoices.reduce(
      (acc, invoice) => acc + parseInt(invoice.total),
      0
    );
  });

  res.status(200).json(clients);
});

// @desc Create a new client
// @route POST /api/clients
// @access Private
export const store = asyncHandler(async (req, res) => {
  const { name, contact, date_of_birth, gender, address } = req.body;

  const client = await prisma.client.create({
    data: {
      name,
      contact,
      date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
      gender,
      address,
    },
  });

  res.status(201).json(client);
});

// @desc Get client by id
// @route GET /api/clients/:id
// @access Private
export const show = asyncHandler(async (req, res) => {
  const client = await prisma.client.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

// @desc Update an existing client
// @route PUT /api/clients/:id
// @access Private
export const update = asyncHandler(async (req, res) => {
  const client = await prisma.client.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (client) {
    client.name = req.body.name || client.name;
    client.contact = req.body.contact || client.contact;
    client.date_of_birth = req.body.date_of_birth
      ? new Date(req.body.date_of_birth)
      : client.date_of_birth;
    client.gender = req.body.gender || client.gender;
    client.address = req.body.address || client.address;

    const updatedClient = await prisma.client.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: client.name,
        contact: client.contact,
        date_of_birth: client.date_of_birth,
        gender: client.gender,
        address: client.address,
      },
    });

    res.json(updatedClient);
  } else {
    res.status(404);

    throw new Error("Client not found");
  }
});

// @desc Delete a client
// @route DELETE /api/clients/:id
// @access Private
export const destroy = asyncHandler(async (req, res) => {
  try {
    await prisma.client.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({
      messsage: "Client deleted successfully",
    });
  } catch (error) {
    res.status(404);

    throw new Error("Client not found");
  }
});
