const { Schema } = require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail')

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, 'Invalid Email Address'],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length
  })
  .set(function (value) {
    this.set(value)
  })

const User = model('user', userSchema)

module.exports = User
