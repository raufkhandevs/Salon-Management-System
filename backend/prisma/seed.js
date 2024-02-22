import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import modules from "./data/modules.data.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: "anas.ali" },
    update: {},
    create: {
      username: "anas.ali",
      name: "Anas Ali",
      password: await argon2.hash("oneeyedking1"),
      roles: {
        create: {
          name: "Superadmin",
        },
      },
    },
  });

  for (const module in modules) {
    for (let i = 0; i < modules[module].length; i++) {
      await prisma.permission.upsert({
        where: {
          name_module: {
            name: modules[module][i],
            module,
          },
        },
        update: {
          name: modules[module][i],
          module,
        },
        create: {
          name: modules[module][i],
          module,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
