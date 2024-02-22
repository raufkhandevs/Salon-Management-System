import express from "express";
import Auth from "../middleware/auth.middleware.js";
import {
  index,
  store,
  show,
  update,
  profile,
  updateProfile,
  destroy,
} from "../controllers/user.controller.js";
import { Can, CanAny } from "../middleware/authorization.middleware.js";
import userValidator from "../validators/userValidator.js";

const router = express.Router();

router.route("/").get([Auth, CanAny(["view-users", "create-invoices"])], index);
router.route("/").post([Auth, Can("create-users"), userValidator], store);
router
  .route("/:id")
  .get([Auth, CanAny(["view-users", "create-invoices"])], show);
router.route("/:id").patch([Auth, Can("edit-users"), userValidator], update);
router.route("/profile").get(Auth, profile);
router.route("/profile").put(Auth, updateProfile);
router.route("/:id").delete([Auth, Can("delete-users")], destroy);

export default router;
