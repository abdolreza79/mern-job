import { FormRow } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom'
import { useNavigation, Form } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { SubmitBtn } from '../components'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const file = formData.get('avatar')
  if (file && file.size > 500000) {
    toast.error('Size image is too large')
    return null
  }
  try {
    await customFetch.patch(`users/update-user`, formData)
    toast.success('profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  return null
}

const Profile = () => {
  const { user } = useOutletContext()
  const { name, lastName, email, location } = user

  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              // multiple
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
              encType='multipart/form-data'
            />
          </div>
          <FormRow type='text' name='name' defaultValue={name} />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            defaultValue={lastName}
          />
          <FormRow type='email' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
