import { Schema, model } from 'mongoose'

const workingHoursSchema = new Schema({
  day: {
    type: String,
    enum: [
      'Friday',
      'Monday',
      'Saturday',
      'Sunday',
      'Thursday',
      'Tuesday',
      'Wednesday'
    ],
    required: true
  },
  startTime: {
    type: Number,
    max: 1440,
    required: true
  },
  endTime: {
    type: Number,
    max: 1440,
    required: true
  }
})

const restaurantSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    cashier: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    messengerBotID: {
      type: String,
      maxlength: 100,
      required: true,
      unique: true
    },
    workingHours: [workingHoursSchema]
  },
  {
    timestamps: true
  }
)

const Restaurant = model('restaurant', restaurantSchema)

export default Restaurant
