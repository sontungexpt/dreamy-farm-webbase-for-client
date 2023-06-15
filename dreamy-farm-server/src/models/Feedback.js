import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Feedback = new Schema(
  {
    user: { type: ObjectId, ref: 'UserInfo' },
    content: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Feedback', Feedback);
