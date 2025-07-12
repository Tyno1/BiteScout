import express from "express";
import * as controller from "../controllers/courseController.js";

const router = express.Router();

router.get("/", controller.getAllCourses);
router.post("/", controller.createCourse);
router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

export default router;
