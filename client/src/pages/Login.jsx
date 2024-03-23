import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Link, useNavigate } from 'react-router-dom'
import { FormRow, SubmitBtn } from '../components'
import { toast } from 'react-toastify'
import { Form, useNavigation, redirect, useActionData } from 'react-router-dom'
import customFetch from '../utils/customFetch'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // const errors = {}
  // if (data.password.length < 8) {
  //   errors.message = 'must be atleast 8 characters'
  //   return errors
  // }
  try {
    await customFetch.post('/auth/login', data)
    toast.success('login successfull')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const Login = () => {
  const navigate = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('Take a test drive')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.message)
      return error
    }
  }

  return (
    <Wrapper>
      <Form className='form' method='post'>
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='email' />
        <FormRow type='password' name='password' labelText='password' />
        <SubmitBtn />
        {/* <button className='btn btn-block' type='button' onClick={loginDemoUser}>
          explore the app
        </button> */}
        <p>
          Not a member yet ?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
