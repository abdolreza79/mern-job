import { NavLink } from 'react-router-dom'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links'

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext()
  const { role } = user
  return (
    <div className='nav-links'>
      {links.map(({ text, path, icon }) => {
        if (path === 'admin' && role !== 'admin') return
        return (
          <NavLink
            key={text}
            to={path}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
