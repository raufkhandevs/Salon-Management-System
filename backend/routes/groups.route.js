import express from "express";
import Auth from "../middleware/auth.middleware.js";
import {
  store,
  show,
  update,
  destroy,
  index,
} from "../controllers/group.controller.js";
import { Can, CanAny } from "../middleware/authorization.middleware.js";
import groupValidator from "../validators/groupValidator.js";

const router = express.Router();

router.route("/").get([Auth, CanAny(["view-groups", "view-services"])], index);
router.route("/").post([Auth, Can("create-groups"), groupValidator], store);
router.route("/:id").get([Auth, CanAny("view-groups", "view-services")], show);
router.route("/:id").patch([Auth, Can("edit-groups"), groupValidator], update);
router.route("/:id").delete([Auth, Can("delete-groups")], destroy);

export default router;
