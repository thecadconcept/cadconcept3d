'use client'

import { useEffect } from 'react'

function isFormElement(target: EventTarget | null): boolean {
    if (!target || !(target instanceof HTMLElement)) return false
    const tag = target.tagName
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

export default function ContentProtection() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            if (isFormElement(e.target)) return
            e.preventDefault()
        }

        const handleCopy = (e: ClipboardEvent) => {
            if (isFormElement(e.target)) return
            e.preventDefault()
        }

        const handleCut = (e: ClipboardEvent) => {
            if (isFormElement(e.target)) return
            e.preventDefault()
        }

        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('copy', handleCopy)
        document.addEventListener('cut', handleCut)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('copy', handleCopy)
            document.removeEventListener('cut', handleCut)
        }
    }, [])

    return null
}
