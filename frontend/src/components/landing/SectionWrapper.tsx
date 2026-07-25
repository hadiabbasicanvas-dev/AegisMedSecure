import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  id,
  delay = 0,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={cn('py-16 md:py-24 px-6 max-w-7xl mx-auto', className)}
    >
      {children}
    </motion.section>
  );
};
