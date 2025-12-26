'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypewriterTextProps {
    text: string
    className?: string
    cursor?: boolean
    speed?: number
    delay?: number
}

export default function TypewriterText({
    text,
    className = '',
    cursor = true,
    speed = 100,
    delay = 0,
    loop = false
}: TypewriterTextProps & { loop?: boolean }) {
    const [displayedText, setDisplayedText] = useState('')
    const [start, setStart] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setStart(true)
        }, delay)
        return () => clearTimeout(timer)
    }, [delay])

    useEffect(() => {
        if (!start) return

        let timeout: NodeJS.Timeout

        if (isDeleting) {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length - 1))
                }, speed / 2)
            } else if (loop) {
                setIsDeleting(false)
                timeout = setTimeout(() => { }, 500)
            }
        } else {
            if (displayedText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length + 1))
                }, speed)
            } else if (loop) {
                timeout = setTimeout(() => {
                    setIsDeleting(true)
                }, 2000)
            }
        }

        return () => clearTimeout(timeout)
    }, [displayedText, isDeleting, start, loop, text, speed])

    return (
        <span className={`${className} inline-block min-h-[1em]`}>
            {displayedText || '\u00A0'}
            {cursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
                />
            )}
        </span>
    )
}
