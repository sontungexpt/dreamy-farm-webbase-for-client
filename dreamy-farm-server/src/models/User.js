import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User = new Schema(
  {
    email: { type: String, default: '', required: true, maxlength: 255 },
    password: { type: String, default: '', required: true, maxlength: 255 },
    roles: {
      type: [String],
      default: ['user'],
    },

    // active, blocked, deleted
    status: { type: String, default: 'active' },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

// login.index({ first: 1, last: -1 }) Nơi đánh index
export default mongoose.model('User', User);
