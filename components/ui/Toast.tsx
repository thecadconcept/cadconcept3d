'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
    message: string
    type: ToastType
    onClose: () => void
    duration?: number
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
    }

    const colors = {
        success: 'border-green-500/50 bg-green-500/10 text-green-400',
        error: 'border-red-500/50 bg-red-500/10 text-red-400',
        info: 'border-primary/50 bg-primary/10 text-primary',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`
        fixed top-24 right-4 md:right-8 z-50 
        max-w-md w-full md:w-auto
        px-6 py-4 
        border-2 backdrop-blur-md rounded-lg shadow-2xl
        ${colors[type]}
      `}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm">
                    {icons[type]}
                </div>
                <div className="flex-1">
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                        {message}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
                    aria-label="Close notification"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-current rounded-full"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
            />
        </motion.div>
    )
}

interface ToastContainerProps {
    toasts: Array<{ id: string; message: string; type: ToastType }>
    onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed top-0 right-0 z-50 pointer-events-none">
            <div className="pointer-events-auto">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onClose={() => onRemove(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
