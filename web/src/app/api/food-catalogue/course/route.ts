import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/utils/db"
import Course from "@/app/api/models/course"

// GET all courses
export async function GET() {
  await dbConnect()
  try {
    const courses = await Course.find({})
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

// POST a new course
export async function POST(req: NextRequest) {
  await dbConnect()
  try {
    const body = await req.json()
    const course = await Course.create(body)
    return NextResponse.json(course, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Course name must be unique" }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}

// PUT (update) a course
export async function PUT(req: NextRequest) {
  await dbConnect()
  try {
    const body = await req.json()
    const { id, ...updateData } = body

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCourse)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

// DELETE a course
export async function DELETE(req: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    const deletedCourse = await Course.findByIdAndDelete(id)

    if (!deletedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Course deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}

