import mongoose from 'mongoose'
import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import day from 'dayjs'

export const index = async (req, res, next) => {
  // const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.userId }
  // console.log(req.query)

  const { search, jobType, jobStatus, sort } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  }
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ]
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus
  }
  const totalJobs = await Job.find(queryObject).countDocuments()

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  }
  const sortKey = sortOptions[sort] || sortOptions.newest
  // setup pagination
  const page = Number(req.query.page || 1)
  const limit = Number(req.query.limit || 10)
  const skip = (page - 1) * limit
  const numOfPages = Math.ceil(totalJobs / limit)
  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)
  res.status(StatusCodes.OK).json({
    totalJobs,
    numOfPages,
    currentPage: page,
    // prev: page > 1 ? `/jobs?page=${page - 1}` : null,
    // next: page < numOfPages ? `/jobs?page=${page + 1}` : null,
    jobs,
  })
}

export const create = async (req, res, next) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  return res
    .status(StatusCodes.CREATED)
    .json({ message: 'job added successful' })
}

export const show = async (req, res, next) => {
  const job = await Job.findById(req.params.id)
  return res.status(StatusCodes.OK).json({ job })
}

export const update = async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  return res.status(StatusCodes.OK).json({ msg: 'job modified', job })
}

export const destroy = async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id)
  return res
    .status(StatusCodes.OK)
    .json({ message: 'job deleted successfully', job })
}

export const showStats = async (req, res, next) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ])
  stats = stats.reduce(
    (prev, current) => ({
      ...prev,
      [current._id]: current.count,
    }),
    {}
  )
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1,
      },
    },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item
    const date = day()
      .month(month - 1)
      .year(year - 1)
      .format('MMM YY')
    return { date, count }
  })

  res.json({ defaultStats, monthlyApplications })
}
