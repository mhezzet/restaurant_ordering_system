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
  prices: [pricesSchema],
  addOns: [addOnsSchema],
  itemPic: {
    type: String,
    maxlength: 1024
  }
})

const Item = model('item', itemSchema)

export default Item
