import { Schema, model } from "mongoose";
import "./User";

const RoomSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Room", RoomSchema, "rooms", { overwriteModels: true });