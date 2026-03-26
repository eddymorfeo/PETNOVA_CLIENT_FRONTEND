"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type LandingRevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
};

export function LandingReveal({
  children,
  delay = 0,
  y = 32,
  x = 0,
  scale = 0.985,
  className,
}: LandingRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}