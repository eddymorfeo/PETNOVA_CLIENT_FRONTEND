"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type LandingRevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function LandingReveal({
  children,
  delay = 0,
  y = 24,
  className,
}: LandingRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}