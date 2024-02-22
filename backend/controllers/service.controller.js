import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma.utils.js";

// @desc Return all services
// @route GET /api/services
// @access Private
export const index = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany({
    include: {
      group: true,
    },
  });

  res.status(200).json(services);
});

// @desc Create a new service
// @route POST /api/services
// @access Private
export const store = asyncHandler(async (req, res) => {
  const { name, description, price, group_id } = req.body;

  const serviceExists = await prisma.service.findFirst({
    where: {
      name,
    },
  });

  if (serviceExists) {
    res.status(400);
    throw new Error("Service already exists");
  }

  const service = await prisma.service.create({
    data: {
      name,
      description,
      price,
      group_id: +group_id,
    },
    include: {
      group: true,
    },
  });

  if (service) {
    res.status(201).json(service);
  } else {
    res.status(400);
    throw new Error("Invalid service data");
  }
});

// @desc Get service by id
// @route GET /api/services/:id
// @access Private
export const show = asyncHandler(async (req, res) => {
  const service = await prisma.service.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      group: true,
    },
  });

  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

// @desc Update an existing service
// @route PUT /api/services/:id
// @access Private
export const update = asyncHandler(async (req, res) => {
  const service = await prisma.service.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      group: true,
    },
  });

  if (service) {
    if (req.body.name) {
      const nameNotUnique = await prisma.service.findFirst({
        where: {
          id: {
            not: +req.params.id,
          },
          name: req.body.name,
        },
      });

      if (nameNotUnique) {
        res.status(400);
        throw new Error("Service already exists");
      }
    }

    service.name = req.body.name || service.name;
    service.price = req.body.price || service.price;
    service.description = req.body.description || service.description;
    service.group_id = req.body.group_id || service.group_id;

    const updatedService = await prisma.service.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: service.name,
        price: service.price,
        description: service.description,
        group_id: service.group_id,
      },
      include: {
        group: true,
      },
    });

    res.json(updatedService);
  } else {
    res.status(404);

    throw new Error("Service not found");
  }
});

// @desc Delete a service
// @route DELETE /api/services/:id
// @access Private
export const destroy = asyncHandler(async (req, res) => {
  try {
    await prisma.service.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({
      messsage: "Service deleted successfully",
    });
  } catch (error) {
    res.status(404);

    throw new Error("Service not found");
  }
});
