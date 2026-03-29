'use client'

import { motion } from 'framer-motion'

const teethPoints = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2
  const round = (value: number) => Number(value.toFixed(3))
  return {
    x1: round(200 + Math.cos(angle) * 80),
    y1: round(200 + Math.sin(angle) * 80),
    x2: round(200 + Math.cos(angle) * 100),
    y2: round(200 + Math.sin(angle) * 100),
  }
})

export default function BlueprintSVG() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
      },
    },
  }

  return (
    <div className="relative w-full aspect-square">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid lines */}
        <motion.g
          stroke="#00E5FF"
          strokeWidth="1"
          opacity="0.3"
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              variants={pathVariants}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={i * 40}
              y1="0"
              x2={i * 40}
              y2="400"
              variants={pathVariants}
            />
          ))}
        </motion.g>

        {/* Gear outline */}
        <motion.circle
          cx="200"
          cy="200"
          r="80"
          stroke="#00E5FF"
          strokeWidth="2"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Inner circle */}
        <motion.circle
          cx="200"
          cy="200"
          r="40"
          stroke="#00E5FF"
          strokeWidth="1.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Teeth */}
        {teethPoints.map((point, i) => {
          return (
            <motion.line
              key={i}
              x1={point.x1}
              y1={point.y1}
              x2={point.x2}
              y2={point.y2}
              stroke="#00E5FF"
              strokeWidth="2"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          )
        })}

        {/* Crosshair (Center) */}
        <motion.g
          stroke="#00E5FF"
          strokeWidth="1.5"
          initial="hidden"
          animate="visible"
        >
          <motion.line x1="180" y1="200" x2="220" y2="200" variants={pathVariants} />
          <motion.line x1="200" y1="180" x2="200" y2="220" variants={pathVariants} />
        </motion.g>

        {/* Top Left Target Icon */}
        <motion.g
          initial="hidden"
          animate="visible"
        >
          <motion.circle cx="40" cy="40" r="10" stroke="#00E5FF" strokeWidth="2" fill="none" variants={pathVariants} />
          <motion.circle cx="40" cy="40" r="3" fill="#00E5FF" variants={pathVariants} />
        </motion.g>
      </svg>
    </div>
  )
}

