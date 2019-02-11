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

const itemSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    min: 0
  },
  addOnsSingle: addOnsSchema,
  addOnsMulti: [addOnsSchema]
})

const inventorySchema = new Schema({
  items: [itemSchema],
  comment: {
    type: String,
    maxlength: 500
  }
})

const Inventory = model('inventory', inventorySchema)

export default Inventory
