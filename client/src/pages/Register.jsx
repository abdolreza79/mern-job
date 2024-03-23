import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo, SubmitBtn } from '../components'
import { Form, redirect, useNavigation } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Register is successfull')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}
const Register = () => {
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='name' />
        <FormRow type='text' name='lastName' labelText='lastname' />
        <FormRow type='text' name='location' labelText='location' />
        <FormRow type='email' name='email' labelText='email' />
        <FormRow type='password' name='password' labelText='password' />
        <SubmitBtn />
        <p>
          Already a member ?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
