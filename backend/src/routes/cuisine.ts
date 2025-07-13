import express from "express";
import * as controller from "../controllers/cuisineController.js";

const router = express.Router();

router.get("/", controller.getCuisine);
router.get("/:id", controller.getCuisineById);
router.post("/", controller.createCuisine);
router.put("/:id", controller.updateCuisine);
router.delete("/:id", controller.deleteCuisine);

export default router;
