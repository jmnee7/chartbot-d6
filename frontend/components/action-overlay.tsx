"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Download, Radio, Vote, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const actionItems = [
  {
    title: "스트리밍",
    icon: Music,
    href: "/streaming",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    title: "다운로드",
    icon: Download,
    href: "/download",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "라디오신청",
    icon: Radio,
    href: "/radio",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    title: "투표",
    icon: Vote,
    href: "/votes",
    gradient: "from-purple-500 to-violet-400",
  },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
    },
  },
};

export function ActionOverlay({ isOpen, onClose }: ActionOverlayProps) {
  const router = useRouter();

  const handleItemClick = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Action Grid */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Action</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-2 gap-6">
                {actionItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleItemClick(item.href)}
                      className="flex flex-col items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                    >
                      {/* 원형 아이콘 */}
                      <div
                        className={`w-16 h-16 mb-3 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* 제목 */}
                      <span className="text-sm font-medium text-gray-700">
                        {item.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
