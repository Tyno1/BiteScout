import { Request, Response, NextFunction } from "express";
import Course from "../models/Course.js";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      res.status(404).json({ message: "No courses found" });
      return;
    }
    res.status(200).json(courses);
    return;
  } catch (error) {
    return next(error);
  }
};

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = await req.body;

    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const course = await Course.create(body);

    if (!course) {
      res.status(400).json({ error: "Failed to create course" });
      return;
    }

    res.status(201).json(course);
    return;
  } catch (error: any) {
    return next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { id } = req.params;

    if (!body) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    if (!id) {
      res.status(400).json({ error: "Course ID is required" });
      return;
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      res.status(400).json({ error: "Course not found" });
      return;
    }

    res.status(200).json(updatedCourse);
    return;
  } catch (error) {
    return next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Course ID is required" });
      return;
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.status(200).json({ message: "Course deleted successfully" });
    return;
  } catch (error) {
    return next(error);
  }
};
