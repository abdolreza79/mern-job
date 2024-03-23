import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

export const action = async ({ params }) => {
  // console.log(params.id)
  try {
    const {
      data: { message },
    } = await customFetch.delete(`/jobs/${params.id}`)
    toast.success(message)
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  return redirect('/dashboard/all-jobs')
}
const DeleteJob = () => {
  return <h1>DeleteJob Page</h1>
}

export default DeleteJob
