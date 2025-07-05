import { connectToDB } from "@/lib/mongodb";
import Vocalist from "@/models/Vocalist";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const vocalists = await Vocalist.find();
    return new Response(JSON.stringify(vocalists), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch songs", { status: 500 });
  }
}

// POST a new vocalist
export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();

    const newVocalist = await Vocalist.create({
      label: data.label,
      // id: data.id,
      vocalistLowNote: data.vocalistLowNote,
      vocalistHighNote: data.vocalistHighNote,
    });

    return NextResponse.json(newVocalist, { status: 201 });
  } catch (error) {
    return new Response("Failed to add vocalist", { status: 500 });
  }
}

// DELETE a vocalist by _id
export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    if (!id) {
      return new Response("Missing vocalist ID", { status: 400 });
    }

    const deletedVocalist = await Vocalist.findByIdAndDelete(id);

    if (!deletedVocalist) {
      return new Response("Vocalist not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Vocalist deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete vocalist", { status: 500 });
  }
}
