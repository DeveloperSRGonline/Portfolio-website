import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

import { Navbar, Welcome, Dock } from '#components'
import Terminal from '#windows/Terminal'
import Safari from '#windows/Safari'
import Resume from '#windows/Resume'
import Finder from '#windows/Finder'
import Txt from '#windows/Txt'
import Img from '#windows/Img'
import { Contacts } from '#windows'


gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Txt />
      <Img />
      <Contacts />
    </main>
  )
}

export default App