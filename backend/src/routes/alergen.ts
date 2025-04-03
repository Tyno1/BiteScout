import express from "express";
import * as controller from "../controllers/allergenController.js";

const router = express.Router();

router.get("/", controller.getAllergens);
router.post("/", controller.createAllergens); 
router.put("/:id", controller.updateAllergens);
router.delete("/:id", controller.deleteAllergens);

export default router;
