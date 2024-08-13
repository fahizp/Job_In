import express from "express";
import {
  userSignUp,
  userLogin,
  logout,
  protect,
  refreshingToken,
  nameCheck
} from "../controllers/authController";
import { tokenVerification } from "../middleWare/tokenVerification";
import { body } from "express-validator";

const router = express.Router();



router.post(
  "/signup",
  body("name", "Username should be alphanumeric")
    .isLength({ min: 5 })
    .isAlphanumeric(),

  body("email")
    .isEmail()
    .withMessage("Please Enter a valid email address.")
    .normalizeEmail(),

  body("password", "Password should contain at least 5 alphanumeric characters.")
    .isLength({ min: 5 })
    .isAlphanumeric(),
  userSignUp
);

router.post("/login", userLogin);
router.post("/logout", logout);
router.get("/protected", tokenVerification, protect);
router.post("/refreshtoken", refreshingToken);
router.post("/nameCheck", nameCheck);

export default router;
