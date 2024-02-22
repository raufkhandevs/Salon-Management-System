import asyncHandler from "express-async-handler";
import argon2 from "argon2";
import { generateToken } from "../utils/jwt.utils.js";
import prisma from "../utils/prisma.utils.js";

// @desc Return all users
// @route GET /api/users
// @access Private
export const index = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      roles: true,
    },
  });

  res.status(200).json(users);
});

// @desc Register a new user
// @route POST /api/users
// @access Public
export const store = asyncHandler(async (req, res) => {
  const { name, username, phone_number, password, roles } = req.body;

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { phone_number }],
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
      phone_number,
      password: await argon2.hash(password),
      roles: {
        connect: roles.map((roleId) => {
          return {
            id: +roleId,
          };
        }),
      },
    },
    include: {
      roles: {
        include: {
          permissions: true,
        },
      },
    },
  });

  delete user.password;

  user.token = generateToken(user.id);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Return a single user
// @route GET /api/users/:id
// @access Private
export const show = asyncHandler(async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      id: +req.params.id,
    },
    include: {
      roles: true,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    delete user.password;

    res.status(200).json(user);
  }
});

// @desc Get logged in user's profile
// @route GET /api/users/profile
// @access Private
export const profile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      roles: {
        include: {
          permissions: true,
        },
      },
    },
  });

  delete user.password;

  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Unauthorized, user doesn't exist");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (user) {
    if (req.body.username) {
      const usernameNotUnique = await prisma.user.findFirst({
        where: {
          id: {
            not: req.user.id,
          },
          username: req.body.username,
        },
      });

      if (usernameNotUnique) {
        res.status(400);
        throw new Error("Username already in use");
      }
    }

    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;

    const { password } = user;

    if (req.body.password) {
      user.password = await argon2.hash(req.body.password);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: req.body.name || user.name,
        username: req.body.username || user.username,
        password,
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    delete updatedUser.password;

    res.json(updatedUser);
  } else {
    res.status(401);

    throw new Error("Unauthorized, user doesn't exist");
  }
});

// @desc Update user profile
// @route PUT /api/users/:id
// @access Private
export const update = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (user) {
    if (req.body.username) {
      const usernameNotUnique = await prisma.user.findFirst({
        where: {
          id: {
            not: +req.params.id,
          },
          username: req.body.username,
        },
      });

      if (usernameNotUnique) {
        res.status(400);
        throw new Error("Username already in use");
      }
    }

    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;

    let { password } = user;

    if (req.body.password) {
      password = await argon2.hash(req.body.password);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name || user.name,
        username: req.body.username || user.username,
        phone_number: req.body.phone_number || user.phone_number,
        password,
        roles: {
          set: req.body.roles.map((role) => {
            return {
              id: +role,
            };
          }),
        },
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    delete updatedUser.password;

    res.json(updatedUser);
  } else {
    res.status(401);

    throw new Error("Unauthorized, user doesn't exist");
  }
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
export const destroy = asyncHandler(async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({
      messsage: "User deleted successfully",
    });
  } catch (error) {
    res.status(404);

    throw new Error("User not found");
  }
});
