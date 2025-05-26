import mongoose, { Schema, Document, Model } from "mongoose";

// Define a TypeScript interface for type safety
export interface ISong extends Document {
  label: string;
  artist: string;
  id: string;
  songLowNote: string;
  songHighNote: string;
  songOriginalKey: string;
}

// Define the schema
const SongSchema: Schema<ISong> = new Schema(
  {
    label: { type: String, required: true },
    artist: { type: String, required: true },
    id: { type: String, required: true }, // If this is a separate ID from _id
    songLowNote: { type: String, required: true },
    songHighNote: { type: String, required: true },
    songOriginalKey: { type: String, required: true },
  },
  { collection: "songs" }
);

// Use mongoose.models to avoid recompiling the model in development
const Song: Model<ISong> =
  mongoose.models.Song || mongoose.model<ISong>("Song", SongSchema);

export default Song;
