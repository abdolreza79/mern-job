import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  email: String,
  password: String,
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: String,
  avatarPublicId: String,
})

userSchema.methods.toJson = function () {
  let obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('User', userSchema)
