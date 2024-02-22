import express from "express";
import Auth from "../middleware/auth.middleware.js";
import {
  store,
  show,
  update,
  destroy,
  index,
} from "../controllers/client.controller.js";
import { Can, CanAny } from "../middleware/authorization.middleware.js";
import clientValidator from "../validators/clientValidator.js";

const router = express.Router();

router
  .route("/")
  .get([Auth, CanAny(["view-clients", "create-invoices"])], index);
router.route("/").post([Auth, Can("create-clients"), clientValidator], store);
router
  .route("/:id")
  .get([Auth, CanAny(["view-clients", "create-invoices"])], show);
router
  .route("/:id")
  .patch([Auth, Can("edit-clients"), clientValidator], update);
router.route("/:id").delete([Auth, Can("delete-clients")], destroy);

export default router;
