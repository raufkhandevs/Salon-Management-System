import express from "express";
import Auth from "../middleware/auth.middleware.js";
import {
  store,
  show,
  update,
  destroy,
  index,
} from "../controllers/coupon.controller.js";
import { Can, CanAny } from "../middleware/authorization.middleware.js";
import couponValidator from "../validators/couponValidator.js";

const router = express.Router();

router
  .route("/")
  .get([Auth, CanAny(["view-coupons", "create-invoices"])], index);
router.route("/").post([Auth, Can("create-coupons"), couponValidator], store);
router
  .route("/:id")
  .get([Auth, CanAny(["view-coupons", "create-invoices"])], show);
router
  .route("/:id")
  .patch([Auth, Can("edit-coupons"), couponValidator], update);
router.route("/:id").delete([Auth, Can("delete-coupons")], destroy);

export default router;
