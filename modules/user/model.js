import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from 'config'
import JWT from 'jsonwebtoken'

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true
    },
    lastName: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true
    },
    profilePic: {
      type: String,
      minlength: 4,
      maxlength: 1024
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE']
    },
    messengerUserID: {
      type: String,
      maxlength: 100
    },
    roles: [
      {
        type: String,
        enum: ['ADMIN', 'USER', 'CASHIER', 'OWNER'],
        required: true
      }
    ],
    loginType: {
      type: String,
      enum: ['MESSENGER_ID', 'LOCAL'],
      required: true
    },
    userName: {
      type: String,
      trim: true,
      minlength: 4,
      maxlength: 50
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 1024
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'restaurant'
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.genToken = function() {
  return JWT.sign({ id: this._id, roles: this.roles }, config.get('JWT_SECRET'))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function(next) {
  if (this.loginType !== 'LOCAL') next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('user', userSchema)
