import React from 'react'
import { useAllJobsContext } from '../pages/AllJobs'
import Wrapper from '../assets/wrappers/JobsContainer'
import { Job, PageBtnContainer } from '../components'

const JobsContainer = () => {
  const {
    data: { jobs, totalJobs, numOfPages },
  } = useAllJobsContext()
  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  return (
    <Wrapper>
      <h5>
        {totalJobs} {jobs.length > 1 ? 'jobs' : 'job'}
      </h5>
      <div className='jobs'>
        {jobs?.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
