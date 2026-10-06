'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Shared, premium motion primitives for the marketing site.
 *
 * Design intent:
 *  - One consistent easing/spring vocabulary across the whole home page.
 *  - Everything is scroll-triggered with `whileInView` + `viewport once` so
 *    reveals feel deliberate, never janky or repeated.
 *  - `prefers-reduced-motion` is always respected: components render statically.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Container that staggers its direct MotionItem children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

/** Standard fade-up item, tuned to feel weighty but quick. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

/**
 * Scroll-reveal wrapper. Renders a stagger container so any MotionItem
 * descendants animate in sequence when the block scrolls into view.
 */
export function MotionReveal({
  children,
  className,
  amount = 0.2,
  once = true,
  variants = staggerContainer,
}: {
  children: ReactNode
  className?: string
  amount?: number
  once?: boolean
  variants?: Variants
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

/** A single item inside a MotionReveal / stagger container. */
export function MotionItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: 'div' | 'li'
}) {
  const reduce = useReducedMotion()
  const Comp = as === 'li' ? motion.li : motion.div
  if (reduce) {
    const Static = as === 'li' ? 'li' : 'div'
    return <Static className={className}>{children}</Static>
  }
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  )
}

/**
 * Premium hover-lift card. Subtle spring on hover; disabled for reduced motion.
 * Use for interactive cards that link somewhere.
 */
export function HoverCard({
  children,
  className,
  lift = 6,
}: {
  children: ReactNode
  className?: string
  lift?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={cn('h-full', className)}
      whileHover={{ y: -lift }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  )
}
