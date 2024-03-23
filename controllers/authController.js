import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { comparePassword, hashPassword } from '../utils/passwordUtils.js'
import { UnAuthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register = async (req, res, next) => {
  const isFirstAccount = await User.countDocuments()
  req.body.role = isFirstAccount ? 'user' : 'admin'
  req.body.password = await hashPassword(req.body.password)
  const user = await User.create(req.body)
  return res.status(StatusCodes.CREATED).json({
    msg: 'user created',
  })
}

export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))
  if (!isValidUser) throw new UnAuthenticatedError('invalid credentials')
  const token = createJWT({ userId: user._id, role: user.role })
  const oneDay = 24 * 60 * 60 * 1000
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + oneDay),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged in' })
}

export const logout = (req, res, next) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}
