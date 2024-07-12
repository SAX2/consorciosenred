"use client"

import React, { useRef } from 'react'
import { animate, KeyframeOptions, useInView, useIsomorphicLayoutEffect } from 'framer-motion'

interface AnimatedCounterProps {
  from: number;
  to: number;
  animatedOptions?: KeyframeOptions;
  className?: string;
  plus?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from, to, animatedOptions, className, plus }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!inView) return;

    element.textContent = `${plus ? "+" : ""}${String(from)}`;

    const controls = animate(Math.floor(from), to, {
      duration: .8,
      ease: "easeOut",
      ...animatedOptions,
      onUpdate(value) {
        element.textContent = `${plus ? "+" : ""}${value.toFixed(0)}`;
      }
    });

    return () => {
      controls.stop();
    }
  }, [ref, inView, from, to])

  return (
    <span ref={ref} className={className} />
  )
}

export default AnimatedCounter