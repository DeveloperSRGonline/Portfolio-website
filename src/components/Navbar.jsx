import { navIcons, navLinks } from '#constants'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [time, setTime] = useState(dayjs())

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
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* right side */}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className='icon-hover' alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>
          {time.format('ddd MMM D h:mm A')}
        </time>
      </div>
    </nav>
  )
}

export default Navbar