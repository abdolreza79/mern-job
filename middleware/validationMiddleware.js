import { body, validationResult, param } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from '../errors/customErrors.js'
import { JOB_TYPE, JOB_STATUS } from '../utils/constants.js'
import { isValidObjectId } from 'mongoose'
import JobModel from '../models/JobModel.js'
import User from '../models/userModel.js'

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnAuthorizedError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateJobInput = withValidationError([
  body('company')
    .notEmpty()
    .withMessage('company is required')
    .isLength({ min: 4 })
    .withMessage('company must be atleast 4 characters')
    .trim(),
  body('position').notEmpty().withMessage('position is required').trim(),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid type value'),
])

export const validateIdParam = withValidationError([
  param('id').custom(async (value, { req }) => {
    const isValidId = isValidObjectId(value)
    if (!isValidId) {
      throw new BadRequestError('invalid mongoDB id')
    }
    const job = await JobModel.findById(value)
    if (!job) {
      throw new NotFoundError(`no job exist with id ${value} `)
    }
    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === job.createdBy.toString()
    if (!isAdmin && !isOwner)
      throw new UnAuthorizedError('not authorized to access this route')
  }),
])

export const validateRegisterInput = withValidationError([
  body('name').notEmpty().withMessage('name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid format email')
    .custom(async (email) => {
      const isEmailExist = await User.findOne({ email })
      if (isEmailExist) throw new BadRequestError('email already exist')
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be atleast 8 characters'),
  body('location').notEmpty().withMessage('location is required'),
])

export const validateLoginInput = withValidationError([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid format email'),
  body('password').notEmpty().withMessage('password is required'),
])

export const validateUpdateUserInput = withValidationError([
  body('name').notEmpty().withMessage('name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid format email')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError('email already exist')
    }),
  body('location').notEmpty().withMessage('location is required'),
])
