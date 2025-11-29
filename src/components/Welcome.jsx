import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const FONT_WEIGHT = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
}

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, index) => (
        <span key={index} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>{char === ' ' ? '\u00A0' : char}</span>
    ))
}

const setupTextHover = (Container, type) => {
    if (!Container) return () => { };

    const letters = Container.querySelectorAll('span');

    const { min, max, default: base } = FONT_WEIGHT[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weight}` })
    }

    const handleMouseMove = (e) => {
        const { left } = Container.getBoundingClientRect();
        const mousex = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mousex - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 20000);

            animateLetter(letter, min + (max - min) * intensity)
        })
    }

    const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.5))

    Container.addEventListener('mousemove', handleMouseMove)
    Container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        Container.removeEventListener('mousemove', handleMouseMove)
        Container.removeEventListener('mouseleave', handleMouseLeave)
    }
}

const Welcome = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, 'title')
        const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle')

        return () => {
            titleCleanup()
            subtitleCleanup()
        }
    }, [])

    return (
        <section id='welcome'>
            <p ref={subtitleRef}>{renderText('Hey I\'m Shivam! Welcome to my', 'text-3xl font-georama')}</p>
            <h1 className='mt-7' ref={titleRef}>{renderText('Portfolio', 'text-8xl italic font-georama')}</h1>

            <div className='small-screen'>
                <p>This Portfolio is designed for desktop/tablet</p>
            </div>
        </section>
    )
}

export default Welcome