import { Schema, model } from 'mongoose';
import './User';

const RoomSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    players: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

export default model('Room', RoomSchema, 'rooms', { overwriteModels: true });
