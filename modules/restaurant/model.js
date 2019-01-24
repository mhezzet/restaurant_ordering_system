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
    min: 0,
    required: true
  },
  endTime: {
    type: Number,
    max: 1440,
    min: 0,
    required: true
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
    workingHours: [workingHoursSchema]
  },
  {
    timestamps: true
  }
)

const Restaurant = model('restaurant', restaurantSchema)

export default Restaurant
