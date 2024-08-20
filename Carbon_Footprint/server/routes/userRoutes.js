const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { signupSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middlewares/validateUser");

router.route("/").get(userController.home);
router
  .route("/register")
  .post(validate(signupSchema), userController.createUser);

router.route("/login").post(validate(loginSchema), userController.loginUser);

module.exports = router;
