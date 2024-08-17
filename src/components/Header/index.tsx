import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <div>
        <h1>Pomodoro</h1>
        <p>Gerencie seu tempo de maneira mágica!</p>
      </div>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
