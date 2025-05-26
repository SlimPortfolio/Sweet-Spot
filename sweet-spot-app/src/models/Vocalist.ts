import mongoose, { Schema, Document, Model } from "mongoose";

// Define a TypeScript interface for type safety
export interface IVocalist extends Document {
  label: string;
  id: string;
  vocalistLowNote: string;
  vocalistHighNote: string;
}

// Define the schema
const VocalistSchema: Schema<IVocalist> = new Schema(
  {
    label: { type: String, required: true },
    id: { type: String, required: true }, // If this is a separate ID from _id
    vocalistLowNote: { type: String, required: true },
    vocalistHighNote: { type: String, required: true },
  },
  { collection: "vocalists" }
);

// Use mongoose.models to avoid recompiling the model in development
const Vocalist: Model<IVocalist> =
  mongoose.models.Vocalist ||
  mongoose.model<IVocalist>("Vocalist", VocalistSchema);

export default Vocalist;
