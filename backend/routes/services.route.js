import express from "express";
import Auth from "../middleware/auth.middleware.js";
import {
  store,
  show,
  update,
  destroy,
  index,
} from "../controllers/service.controller.js";
import { Can, CanAny } from "../middleware/authorization.middleware.js";
import serviceValidator from "../validators/serviceValidator.js";

const router = express.Router();

router
  .route("/")
  .get([Auth, CanAny(["view-services", "create-invoices"])], index);
router.route("/").post([Auth, Can("create-services"), serviceValidator], store);
router
  .route("/:id")
  .get([Auth, CanAny(["view-services", "create-invoices"])], show);
router
  .route("/:id")
  .patch([Auth, Can("edit-services"), serviceValidator], update);
router.route("/:id").delete([Auth, Can("delete-services")], destroy);

export default router;
