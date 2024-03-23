import express from 'express'
import {
  index,
  create,
  show,
  update,
  destroy,
  showStats,
} from '../controllers/jobControllers.js'
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'

const router = express.Router()

router.route('/').get(index).post(validateJobInput, create)
router.get('/stats', showStats)
router
  .route('/:id')
  .get(validateIdParam, show)
  .patch(validateIdParam, validateJobInput, update)
  .delete(validateIdParam, destroy)

export default router
