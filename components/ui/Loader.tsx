'use client'

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-primary font-mono text-sm animate-pulse">LOADING ASSETS</span>
        </div>
    )
}
