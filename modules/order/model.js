import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
  {
    state: {
      type: String,
      enum: ['OUT_FOR_DELEVERY', 'COMPLETED', 'DECLINED', 'NO_ACTION'],
      required: true
    },
    totalPrice: {
      type: Number,
      min: 0,
      required: true
    },
    orderPrice: {
      type: Number,
      min: 0,
      required: true
    },
    inventory: {
      type: Schema.Types.ObjectId,
      ref: 'inventory',
      required: true
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'restaurant',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'address',
      required: true
    },
    redemptionItem: new Schema({
      itemName: {
        type: String,
        maxlength: 50
      },
      costPoints: {
        type: Number,
        min: 0
      }
    })
  },
  {
    timestamps: true
  }
)

const Order = model('order', orderSchema)

export default Order
