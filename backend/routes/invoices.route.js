import express from "express";
import Auth from "../middleware/auth.middleware.js";
import {
  store,
  show,
  update,
  destroy,
  index,
} from "../controllers/invoice.controller.js";
import { Can, CanAny } from "../middleware/authorization.middleware.js";
import invoiceValidator from "../validators/invoiceValidator.js";

const router = express.Router();

router
  .route("/")
  .get([Auth, CanAny(["view-invoices", "create-invoices"])], index);
router.route("/").post([Auth, Can("create-invoices"), invoiceValidator], store);
router
  .route("/:id")
  .get([Auth, CanAny(["view-invoices", "create-invoices"])], show);
router
  .route("/:id")
  .patch([Auth, Can("edit-invoices"), invoiceValidator], update);
router.route("/:id").delete([Auth, Can("delete-invoices")], destroy);

export default router;
