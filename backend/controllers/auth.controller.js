import asyncHandler from "express-async-handler";
import argon2 from "argon2";
import { generateToken } from "../utils/jwt.utils.js";
import prisma from "../utils/prisma.utils.js";

// @desc Auth user & get token
// @route POST /api/auth/login
// @access Public
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      roles: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (user) {
    const allPermissions = user.roles.map((role) => role.permissions).flat();
    user.permissions = allPermissions.map((permission) => permission.name);
    user.roles = user.roles.map((role) => role.name);

    const isPasswordValid = await argon2.verify(user.password, password);
    if (isPasswordValid) {
      user.token = generateToken(user.id);
      delete user.password;

      return res.json(user);
    }
    res.status(400);
    throw new Error("Invalid Username or Password");
  } else {
    res.status(400);
    throw new Error("Invalid Username or Password");
  }
});
