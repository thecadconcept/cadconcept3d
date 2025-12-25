'use client'

import { motion } from 'framer-motion'

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
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const x1 = 200 + Math.cos(angle) * 80
          const y1 = 200 + Math.sin(angle) * 80
          const x2 = 200 + Math.cos(angle) * 100
          const y2 = 200 + Math.sin(angle) * 100
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#00E5FF"
              strokeWidth="2"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          )
        })}

        {/* Dimensions */}
        <motion.g
          stroke="#00E5FF"
          strokeWidth="1"
          opacity="0.6"
          initial="hidden"
          animate="visible"
        >
          <motion.line
            x1="120"
            y1="200"
            x2="280"
            y2="200"
            variants={pathVariants}
          />
          <motion.line
            x1="120"
            y1="195"
            x2="120"
            y2="205"
            variants={pathVariants}
          />
          <motion.line
            x1="280"
            y1="195"
            x2="280"
            y2="205"
            variants={pathVariants}
          />
        </motion.g>
      </svg>
    </div>
  )
}

