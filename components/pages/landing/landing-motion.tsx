"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedGroup({
  children,
  className,
  delay = 0,
}: AnimatedGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ staggerChildren: 0.12, delayChildren: delay }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {children}
    </motion.div>
  );
}

type AnimatedItemProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedItem({ children, className }: AnimatedItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}