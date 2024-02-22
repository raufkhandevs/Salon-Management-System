import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma.utils.js";

// @desc Return all groups
// @route GET /api/groups
// @access Private
export const index = asyncHandler(async (req, res) => {
  const groups = await prisma.group.findMany({
    include: {
      services: true,
    },
  });

  res.status(200).json(groups);
});

// @desc Create a new group
// @route POST /api/groups
// @access Private
export const store = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const groupExists = await prisma.group.findFirst({
    where: {
      name,
    },
  });

  if (groupExists) {
    res.status(400);
    throw new Error("Group already exists");
  }

  const group = await prisma.group.create({
    data: {
      name,
    },
    include: {
      services: true,
    },
  });

  if (group) {
    res.status(201).json(group);
  } else {
    res.status(400);
    throw new Error("Invalid group data");
  }
});

// @desc Get group by id
// @route GET /api/groups/:id
// @access Private
export const show = asyncHandler(async (req, res) => {
  const group = await prisma.group.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      services: true,
    },
  });

  if (group) {
    res.json(group);
  } else {
    res.status(404);
    throw new Error("Group not found");
  }
});

// @desc Update an existing group
// @route PUT /api/groups/:id
// @access Private
export const update = asyncHandler(async (req, res) => {
  const group = await prisma.group.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      services: true,
    },
  });

  if (group) {
    if (req.body.name) {
      const nameNotUnique = await prisma.group.findFirst({
        where: {
          id: {
            not: +req.params.id,
          },
          name: req.body.name,
        },
      });

      if (nameNotUnique) {
        res.status(400);
        throw new Error("Group already exists");
      }
    }

    group.name = req.body.name || group.name;

    const updatedGroup = await prisma.group.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name || group.name,
      },
    });

    res.json(updatedGroup);
  } else {
    res.status(404);

    throw new Error("Group not found");
  }
});

// @desc Delete a group
// @route DELETE /api/groups/:id
// @access Private
export const destroy = asyncHandler(async (req, res) => {
  try {
    await prisma.group.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({
      messsage: "Group deleted successfully",
    });
  } catch (error) {
    res.status(404);

    throw new Error("Group not found");
  }
});
