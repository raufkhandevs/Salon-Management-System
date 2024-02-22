import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import "colors";
import ErrorHandler from "./middleware/errorHandler.middleware.js";
import NotFoundHandler from "./middleware/notFoundHandler.middleware.js";

import users from "./routes/users.route.js";
import auth from "./routes/auth.route.js";
import roles from "./routes/roles.route.js";
import permissions from "./routes/permissions.route.js";
import groups from "./routes/groups.route.js";
import services from "./routes/services.route.js";
import coupons from "./routes/coupons.route.js";
import clients from "./routes/clients.route.js";
import invoices from "./routes/invoices.route.js";
import dashboard from "./routes/dashboard.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(RouteModelBinding);

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.get("/", (req, res) => {
  res.json({
    message: "Awesome! It's working 😎",
  });
});

// IMPORT ALL API ROUTES BELOW
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/roles", roles);
app.use("/api/permissions", permissions);
app.use("/api/groups", groups);
app.use("/api/services", services);
app.use("/api/coupons", coupons);
app.use("/api/clients", clients);
app.use("/api/invoices", invoices);
app.use("/api/dashboard", dashboard);
// END API ROUTES

app.use(NotFoundHandler);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
