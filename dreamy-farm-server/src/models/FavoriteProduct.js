import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteProduct = new Schema(
  {
    user: { type: ObjectId, ref: 'UserInfo' },
    product: { type: ObjectId, ref: 'Product' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('FavoriteProduct', FavoriteProduct);
