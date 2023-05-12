const express = require("express");

const HttpError = require("../models/http-error");
const PlacesController = require("../controllers/places-controller");
const router = express.Router();

router.get("/:pid", PlacesController.getPlaceById);

router.get("/user/:uid", PlacesController.getPlacesByUserId);

router.post("/", PlacesController.createPlace);

router.patch("/:pid", PlacesController.updatePlace);
router.delete("/:pid", PlacesController.deletePlace);

module.exports = router;
