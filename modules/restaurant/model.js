import { Schema, model } from 'mongoose'

const redemptionItemSchema = new Schema({
  itemName: {
    type: String,
    maxlength: 50
  },
  costPoints: {
    type: Number,
    min: 0
  }
})

const restaurantSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      minlength: 3
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    cashier: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    messengerBotID: {
      type: String,
      maxlength: 100,
      required: true,
      unique: true
    },
    redemptionItems: [redemptionItemSchema],
    deleveryFees: {
      type: Number,
      min: 0,
      required: true
    },
    startTime: {
      type: Number,
      max: 1440,
      min: 0,
      required: true
    },
    endTime: {
      type: Number,
      max: 1440,
      min: 0,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Restaurant = model('restaurant', restaurantSchema)

export default Restaurant
