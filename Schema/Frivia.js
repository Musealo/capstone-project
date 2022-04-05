import { Schema, model } from 'mongoose';
import './User';
import './Room';

const FriviaSchema = new Schema(
  {
    question: { type: String, required: true, minlength: 5 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    answers: [{ value: { type: String }, correct: { type: Boolean } }],
    userAnswers: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default model('Frivia', FriviaSchema, 'frivia', {
  overwriteModels: true,
});
