import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
  {
    state: {
      type: String,
      enum: ['OUT_FOR_DELEVERY', 'COMPLETED', 'DELEVERED', 'DECLINED'],
      required: true
    },
    totalPrice: {
      type: Number,
      min: 0,
      required: true
    },
    inventory: {
      type: Schema.Types.ObjectId,
      ref: 'inventory'
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'restaurant'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

const Order = model('order', orderSchema)

export default Order
