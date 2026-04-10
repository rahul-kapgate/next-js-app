import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "@/model/Todo";

export async function POST(req: NextRequest){

    try {

        await connectDB();

        const body = await req.json();
        const { title, description } = body;

         if (!title || typeof title !== "string" || title.trim() === "") {
            return NextResponse.json(
                {success : false, error : "Title is required"},
                {status: 400}
            );
         }

         const todo = await Todo.create({
            title: title.trim(),
            description: description?.trim() ?? "",
         });

         return NextResponse.json(
            {success: true, data: todo },
            {status: 201}
         );
        
    } catch (error) {
        console.error("[POST /api/todos]", error);
        return NextResponse.json(
            {success: false, error : "Internal server errro"},
            { status: 500 }
        );
    }
}


export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: todos });
  } catch (error) {
    console.error("[GET /api/todos]", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}