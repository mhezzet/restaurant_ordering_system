import { Schema, model } from 'mongoose'

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    city: {
      type: String,
      maxlength: 50,
      trim: true
    },
    district: {
      type: String,
      maxlength: 50,
      trim: true
    },
    street: {
      type: String,
      maxlength: 50,
      trim: true
    },
    buildingNo: {
      type: String,
      maxlength: 50,
      trim: true
    },
    direction: {
      type: String,
      maxlength: 700
    },
    phone: {
      type: String,
      maxlength: 15
    },
    title: {
      type: String,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
)

const Address = model('address', addressSchema)

export default Address
