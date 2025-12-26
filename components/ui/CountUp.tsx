'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface CountUpProps {
    to: number
    from?: number
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
    pad?: number // Number of digits to zero-pad to
}

export default function CountUp({
    to,
    from = 0,
    duration = 2,
    className = '',
    prefix = '',
    suffix = '',
    pad = 0
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(from)
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
        stiffness: 50,
        damping: 20
    })
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(to)
        }
    }, [isInView, motionValue, to])

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                const value = Math.floor(latest)
                let formatted = value.toString()

                if (pad > 0) {
                    formatted = formatted.padStart(pad, '0')
                }

                ref.current.textContent = `${prefix}${formatted}${suffix}`
            }
        })
        return () => unsubscribe()
    }, [springValue, prefix, suffix, pad])

    // Initial render content
    const initialValue = from.toString().padStart(pad, '0')

    return <span ref={ref} className={className}>{prefix}{initialValue}{suffix}</span>
}
