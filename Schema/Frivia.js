import { Schema, model } from "mongoose";
import "./User";
import "./Room";

const FriviaSchema = new Schema(
  {
    question: { type: String, required: true, minlength: 5 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    roomId: { type: Schema.Types.ObjectId, ref: "Room" },
    answers: {type: String},
    userAnswers: {type: String},
  },
  { timestamps: true }
);

export default model("Frivia", FriviaSchema, "frivia", { overwriteModels: true });