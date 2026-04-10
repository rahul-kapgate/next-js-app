import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "@/model/Todo";

// PATCH /api/todos/[id] — toggle completed or update fields
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params; // ✅ must be awaited in Next.js 15

    // Safe JSON parse — guard against empty or malformed body
    let body: Record<string, unknown> = {};
    try {
      const text = await req.text();
      if (text) body = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "Request body is empty" },
        { status: 400 }
      );
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return NextResponse.json(
        { success: false, error: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: todo });
  } catch (error) {
    console.error("[PATCH /api/todos/:id]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] — remove a todo
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params; // ✅ must be awaited in Next.js 15

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return NextResponse.json(
        { success: false, error: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("[DELETE /api/todos/:id]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}