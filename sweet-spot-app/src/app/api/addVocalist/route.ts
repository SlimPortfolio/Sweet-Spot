import { connectToDB } from "@/lib/mongodb";
import Vocalist from "@/models/Vocalist";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();

    const newVocalist = await Vocalist.create({
      label: data.label,
      id: data.id,
      vocalistLowNote: data.vocalistLowNote,
      vocalistHighNote: data.vocalistHighNote,
    });

    return NextResponse.json(newVocalist, { status: 201 });
  } catch (error) {
    return new Response("Failed to add vocalist", { status: 500 });
  }
}
