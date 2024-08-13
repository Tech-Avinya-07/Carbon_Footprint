const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authController.home);
router
  .route("/register")
  .post(validate(signupSchema), authController.createUser);

router.route("/login").post(validate(loginSchema), authController.loginUser);

module.exports = router;
