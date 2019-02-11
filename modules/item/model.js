import { Schema, model } from 'mongoose'

const addOnsSchema = new Schema({
  name: {
    type: String,
    maxlength: 50
  },
  price: {
    type: Number,
    min: 0
  }
})

const pricesSchema = new Schema({
  price: {
    type: Number,
    min: 0
  },
  variant: {
    type: String,
    maxlength: 50
  }
})

const itemSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true
  },
  category: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true
  },
  description: {
    type: String,
    max: 300
  },
  prices: [pricesSchema],
  singleAddOns: [addOnsSchema],
  multiAddOns: [addOnsSchema],
  itemPic: {
    type: String,
    maxlength: 1024,
    default:
      'https://amp.businessinsider.com/images/554cbc856da811b168b0a530-750-500.jpg'
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true
  }
})

const Item = model('item', itemSchema)

export default Item
