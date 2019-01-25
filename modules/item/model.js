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
  size: {
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
  addOns: [addOnsSchema],
  itemPic: {
    type: String,
    maxlength: 1024
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true
  }
})

const Item = model('item', itemSchema)

export default Item
