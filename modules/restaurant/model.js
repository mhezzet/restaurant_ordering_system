import { model, Schema } from 'mongoose'

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
      minlength: 3,
      unique: true
    },
    slug: {
      type: String,
      required: true
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
      type: String,
      maxlength: 10,
      required: true
    },
    endTime: {
      type: String,
      maxlength: 10,
      required: true
    },
    vat: {
      type: Boolean,
      default: false
    },
    restaurantLogo: {
      type: String,
      maxlength: 200
    },
    priority: {
      type: Number,
      min: 0,
      max: 10
    }
  },
  {
    timestamps: true
  }
)

const Restaurant = model('restaurant', restaurantSchema)

export default Restaurant
