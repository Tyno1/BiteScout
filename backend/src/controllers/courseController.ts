import type { ApiError } from "@shared/types/common/errors.js";
import type {
  CreateCourseRequest,
  CreateCourseResponse,
  DeleteCourseRequest,
  DeleteCourseResponse,
  GetAllCoursesResponse,
  GetCourseByIdRequest,
  GetCourseByIdResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from "@shared/types/courses";
import type { NextFunction, Request, Response } from "express";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";
import Course from "../models/Course.js";

type GetAllCoursesApiResponse = GetAllCoursesResponse | ApiError;
type GetCourseByIdApiResponse = GetCourseByIdResponse | ApiError;
type CreateCourseApiResponse = CreateCourseResponse | ApiError;
type UpdateCourseApiResponse = UpdateCourseResponse | ApiError;
type DeleteCourseApiResponse = DeleteCourseResponse | ApiError;

export const getAllCourses = async (
  req: Request,
  res: Response<GetAllCoursesApiResponse>,
  next: NextFunction
) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return next(createError(ErrorCodes.NOT_FOUND, "No courses found"));
    }
    res.status(200).json(courses);
  } catch (error) {
    return next(error);
  }
};

export const getCourseById = async (
  req: Request<GetCourseByIdRequest>,
  res: Response<GetCourseByIdApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Course ID is required"));
    }
    const course = await Course.findById(id);
    if (!course) {
      return next(createError(ErrorCodes.NOT_FOUND, "Course not found"));
    }
    res.status(200).json(course);
  } catch (error) {
    return next(error);
  }
};

export const createCourse = async (
  req: Request<Record<string, never>, unknown, CreateCourseRequest>,
  res: Response<CreateCourseApiResponse>,
  next: NextFunction
) => {
  try {
    const body = req.body;
    if (!body) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Course data is required"));
    }
    	// Remove _id from body to prevent validation errors
	const { _id, ...courseData } = body;
	const course = await Course.create(courseData);
    if (!course) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Failed to create course"));
    }
    res.status(201).json(course);
  } catch (error) {
    return next(error);
  }
};

export const updateCourse = async (
  req: Request<{ id: string }, unknown, UpdateCourseRequest>,
  res: Response<UpdateCourseApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (!id) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Course ID is required"));
    }
    if (!body) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Course data is required"));
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCourse) {
      return next(createError(ErrorCodes.NOT_FOUND, "Course not found"));
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    return next(error);
  }
};

export const deleteCourse = async (
  req: Request<DeleteCourseRequest>,
  res: Response<DeleteCourseApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(ErrorCodes.BAD_REQUEST, "Course ID is required"));
    }
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return next(createError(ErrorCodes.NOT_FOUND, "Course not found"));
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
