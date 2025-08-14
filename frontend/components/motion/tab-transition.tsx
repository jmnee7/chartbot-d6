"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface TabTransitionProps {
  children: ReactNode;
  tabKey: string;
}

export function TabTransition({ children, tabKey }: TabTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
