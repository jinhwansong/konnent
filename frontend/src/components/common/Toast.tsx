'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '@/stores/useToast';

export default function Toast() {
  const { toasts } = useToastStore();
  return (
    <div className="fixed bottom-10 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`min-w-[200px] rounded-lg px-4 py-3 text-sm shadow-md ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
