import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import React, { useRef } from 'react'

const WindowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore()
        const { isOpen, zIndex } = windows[windowKey]

        const ref = useRef(null)
        const isFirstRender = useRef(true)

        // Opening / Closing Animations
        useGSAP(() => {
            const el = ref.current
            if (!el) return

            if (isOpen) {
                // Ensure display is block before animating in
                el.style.display = "block"
                gsap.killTweensOf(el)

                gsap.fromTo(el,
                    { scale: 0.85, opacity: 0, y: 30 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.15)" }
                )
            } else {
                // Prevent exit animation on initial mount
                if (isFirstRender.current) {
                    el.style.display = "none"
                    isFirstRender.current = false
                    return
                }

                gsap.killTweensOf(el)

                gsap.to(el, {
                    scale: 0.85,
                    opacity: 0,
                    y: 30,
                    duration: 0.25,
                    ease: "power3.in",
                    onComplete: () => {
                        el.style.display = "none"
                    }
                })
            }
            isFirstRender.current = false
        }, [isOpen])

        // Drag logic
        useGSAP(() => {
            const el = ref.current
            if (!el) return

            const [instance] = Draggable.create(el, { 
                trigger: el.querySelector('#window-header') || el,
                onPress: () => focusWindow(windowKey) 
            })

            return () => instance.kill()
        }, [])

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex, display: 'none' }}
                className='absolute'
            >
                <Component {...props} />
            </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`

    return Wrapped
}

export default WindowWrapper