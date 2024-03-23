import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import notFound from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  const { status, statusText, data } = useRouteError()
  let content = ''
  if (status === 404) {
    content = (
      <Wrapper>
        <div>
          <img src={notFound} alt='not found page' />
          <h3>Ohh! page not found</h3>
          <p> We can't seem to find the page you are looking for</p>
          <Link to='/dashboard'>Back Home</Link>
        </div>
      </Wrapper>
    )
  } else {
    content = (
      <Wrapper>
        <div>
          <h3>something went wrong</h3>
          {/* <h3>{status}</h3> */}
        </div>
      </Wrapper>
    )
  }
  return content
}

export default Error
