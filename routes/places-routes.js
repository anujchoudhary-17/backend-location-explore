const express = require("express");
const { check } = require("express-validator");

const HttpError = require("../models/http-error");
const PlacesController = require("../controllers/places-controller");
const router = express.Router();

router.get("/:pid", PlacesController.getPlaceById);

router.get("/user/:uid", PlacesController.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  PlacesController.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  PlacesController.updatePlace
);
router.delete("/:pid", PlacesController.deletePlace);

module.exports = router;
