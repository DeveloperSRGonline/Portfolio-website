import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * CustomCursor - premium custom cursor with dot + trailing ring
 * - Automatically detects pointer capabilities (hides/disables on touch screens)
 * - Mix-blend-difference allows cursor to contrast dynamically on light/dark backgrounds
 * - Performs smooth GSAP-based trailing (lerping/quickTo)
 * - Magnifies/morphs when hovering interactive elements
 * - Magnetically pulls `.magnetic` elements (Navbar links, logo, buttons, dock icons, etc.)
 */
const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // 1. Detect if the device has a touch screen
    const touchMediaQuery = window.matchMedia('(pointer: coarse)')
    setIsTouch(touchMediaQuery.matches)

    const handleTouchChange = (e) => {
      setIsTouch(e.matches)
    }

    touchMediaQuery.addEventListener('change', handleTouchChange)
    return () => touchMediaQuery.removeEventListener('change', handleTouchChange)
  }, [])

  useEffect(() => {
    if (isTouch) return

    // 2. Hide default cursor on desktop
    document.body.classList.add('custom-cursor-active')

    // Initial position in center of screen
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })

    // High performance quickTo setters for coordinates
    const xDotTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power3.out' })
    const yDotTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power3.out' })
    const xRingTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRingTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power3.out' })

    const handleMouseMove = (e) => {
      xDotTo(e.clientX)
      yDotTo(e.clientY)
      xRingTo(e.clientX)
      yRingTo(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [isTouch])

  useEffect(() => {
    if (isTouch) return

    let activeMagneticElement = null

    const handleElementMouseMove = (e) => {
      if (!activeMagneticElement) return
      const rect = activeMagneticElement.getBoundingClientRect()
      // Calculate offset from center of element
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)

      // Pull the element towards the cursor
      gsap.to(activeMagneticElement, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseOver = (e) => {
      // General interactive element detection
      const target = e.target.closest('a, button, [role="button"], .cursor-pointer, .dock-icon, .close, .minimize, .maximize, nav p, nav time')
      
      if (target) {
        // Dynamic morphing styles
        const isCloseButton = target.classList.contains('close')
        const isMinimizeButton = target.classList.contains('minimize')
        const isMaximizeButton = target.classList.contains('maximize')
        const isDockIcon = target.classList.contains('dock-icon') || target.closest('#dock')

        let ringBg = 'rgba(255, 255, 255, 0.15)'
        let ringBorder = 'rgba(255, 255, 255, 0.7)'
        let scaleVal = 1.8

        if (isCloseButton) {
          ringBorder = '#ff6157'
          ringBg = 'rgba(255, 97, 87, 0.2)'
          scaleVal = 1.4
        } else if (isMinimizeButton) {
          ringBorder = '#ffc030'
          ringBg = 'rgba(255, 192, 48, 0.2)'
          scaleVal = 1.4
        } else if (isMaximizeButton) {
          ringBorder = '#2acb42'
          ringBg = 'rgba(42, 203, 66, 0.2)'
          scaleVal = 1.4
        } else if (isDockIcon) {
          // Make the cursor ring vanish/shrink over the dock so it doesn't distract from the zoom effect
          ringBorder = 'rgba(255, 255, 255, 0)'
          ringBg = 'rgba(255, 255, 255, 0)'
          scaleVal = 0
        }

        gsap.to(ringRef.current, {
          scale: scaleVal,
          backgroundColor: ringBg,
          borderColor: ringBorder,
          borderWidth: isDockIcon ? 0 : 1,
          duration: 0.3,
          ease: 'power2.out'
        })

        gsap.to(dotRef.current, {
          scale: isDockIcon ? 0.7 : 0.4, // Keep a small, clean dot over the dock icons
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      // Magnetic hover target detection (excl. dock icons so they don't jump around)
      const magneticTarget = e.target.closest('.magnetic, nav p, #window-controls div')
      if (magneticTarget) {
        activeMagneticElement = magneticTarget
        window.addEventListener('mousemove', handleElementMouseMove)
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], .cursor-pointer, .dock-icon, .close, .minimize, .maximize, nav p, nav time')
      
      if (target) {
        // Reset cursor to default state
        gsap.to(ringRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          borderWidth: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        })

        gsap.to(dotRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      // Reset magnetic elements (excl. dock icons)
      const magneticTarget = e.target.closest('.magnetic, nav p, #window-controls div')

      if (magneticTarget && activeMagneticElement === magneticTarget) {
        window.removeEventListener('mousemove', handleElementMouseMove)
        const temp = activeMagneticElement
        activeMagneticElement = null

        gsap.to(temp, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.45)'
        })
      }
    }

    const handleMouseDown = () => {
      gsap.to(dotRef.current, { scale: 0.8, duration: 0.15 })
      gsap.to(ringRef.current, { scale: 0.7, duration: 0.15 })
    }

    const handleMouseUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.15 })
      gsap.to(ringRef.current, { scale: 1, duration: 0.15 })
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleElementMouseMove)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-white/60 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}

export default CustomCursor
