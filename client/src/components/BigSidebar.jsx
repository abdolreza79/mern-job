import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import NavLinks from './NavLinks'

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? '' : 'show-sidebar'}`}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          {/* <div className='nav-links'>
            {links.map(({ text, path, icon }) => (
              <NavLink
                key={text}
                to={path}
                className='nav-link'
                end
              >
                <span className='icon'>{icon}</span>
                {text}
              </NavLink>
            ))}
          </div> */}
          <NavLinks isBigSidebar={true} />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
