import { useState } from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashboardLayout'
import Wrapper from '../assets/wrappers/LogoutContainer'

const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <button
        className='btn logout-btn'
        onClick={() => setShowLogout((show) => !show)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? ' show-dropdown' : ''}`}>
        <button className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer
