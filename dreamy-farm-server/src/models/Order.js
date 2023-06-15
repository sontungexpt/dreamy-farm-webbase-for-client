import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema(
  {
    user: { type: ObjectId, ref: 'UserInfo' },
    status: { type: String, default: 'pending' },

    // info of order
    paymentMethod: { type: String, default: 'cash' },
    paymentStatus: { type: String, default: 'pending' },

    // the list of products in order

    // errors here
    // one product must be have one id for type not for just name
    // temp solution is embed products into order
    products: [],

    // info of user
    price: { type: Number, default: 0 },
    address: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', Order);
