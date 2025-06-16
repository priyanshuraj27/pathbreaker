import mongoose from 'mongoose'
const { Schema, model, models } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo:{
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
})

const User = models?.User || model('User', UserSchema)

export { User }