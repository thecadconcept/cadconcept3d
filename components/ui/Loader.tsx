'use client'

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-cyan-500 font-mono text-sm animate-pulse">LOADING ASSETS</span>
        </div>
    )
}
