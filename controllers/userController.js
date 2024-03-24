import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import Job from '../models/JobModel.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'
import { formatImage } from '../middleware/multerMiddleware.js'

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user.userId)
  const userWithoutPassword = user.toJson()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}
export const updateUser = async (req, res, next) => {
  const file = formatImage(req.file)
  const newUser = { ...req.body }
  delete newUser.password
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(file)
    // const response = await cloudinary.v2.uploader.upload(req.file.path)
    // await fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }
  const updateUser = await User.findByIdAndUpdate(req.user.userId, newUser)
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: 'user updated' })
}

export const getApplicationStats = async (req, res, nex) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ users, jobs })
}
