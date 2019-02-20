import { Schema, model } from 'mongoose'

const botUsageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    selectedLang: {
      type: String,
      maxlength: 50
    },
    quickReplay: {
      type: String,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
)

const BotUsage = model('botUsage', botUsageSchema)

export default BotUsage
