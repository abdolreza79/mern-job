import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = error.message || 'Something went wrong, please try later'
  res.status(statusCode).json({ message })
}

export default errorHandlerMiddleware
