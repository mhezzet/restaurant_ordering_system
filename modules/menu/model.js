import { Schema, model } from 'mongoose'

const menuSchema = new Schema({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'item'
    }
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true
  }
})

const Menu = model('menu', menuSchema)

export default Menu
