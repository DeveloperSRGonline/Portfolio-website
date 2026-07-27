import { navIcons, navLinks } from '#constants'
import useWindowStore from '#store/window'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import useDarkMode from '#hooks/useDarkMode'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {
  const [time, setTime] = useState(dayjs())
  const { openWindow } = useWindowStore()
  const { isDark, toggle } = useDarkMode()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs())
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav>
      {/* left side */}
      <div>
        <img src="/images/logo.svg" alt="Apple Logo" className="" />
        <p className='font-bold'>Shivam's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* right side */}
      <div>
        <ul>
          {navIcons.filter(icon => icon.id !== 4).map(({ id, img }) => (
            <li key={id}>
              <img src={img} className='icon-hover' alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        {/* Dark / Light mode toggle */}
        <button
          id="dark-mode-toggle"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
          className="icon flex items-center justify-center w-7 h-7 rounded-md transition-all duration-300 cursor-pointer"
        >
          {isDark
            ? <Sun size={14} className="text-yellow-300 drop-shadow-[0_0_4px_rgba(250,204,21,0.7)] transition-all duration-300" />
            : <Moon size={14} className="text-gray-700 transition-all duration-300" />
          }
        </button>

        <time>
          {time.format('ddd MMM D h:mm A')}
        </time>
      </div>
    </nav>
  )
}

export default Navbar