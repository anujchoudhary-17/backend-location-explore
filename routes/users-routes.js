const express = require("express");
const { check } = require("express-validator");
const HttpError = require("../models/http-error");
const UsersController = require("../controllers/users-controller");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

router.get("/", UsersController.getAllUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  UsersController.signup
);
router.post("/login", UsersController.login);

module.exports = router;
