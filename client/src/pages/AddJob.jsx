import { FormRow, FormRowSelect, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const response = await customFetch.post('/jobs', data)
    toast.success(response.data.message)
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const AddJob = () => {
  const { user } = useOutletContext()

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULLTIME}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <SubmitBtn formBtn={true} />
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
