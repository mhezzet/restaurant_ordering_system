import { Schema, model } from 'mongoose'

const inventorySchema = new Schema({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'item'
    }
  ],
  comment: {
    type: String,
    maxlength: 500
  }
})

const Inventory = model('inventory', inventorySchema)

export default Inventory
