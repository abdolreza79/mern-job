import { UnAuthorizedError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new UnAuthorizedError('invalid authentication')
  try {
    const user = verifyJWT(token)
    req.user = user
    next()
  } catch (error) {
    if (!isValidJwt) throw new UnAuthorizedError('invalid authentication')
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnAuthorizedError('UnAuthorize to access this route')
    next()
  }
}
