import React from "react";
import { motion } from "framer-motion";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
      >
        {/* Vòng xoay loading */}
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute w-16 h-16 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-600 rounded-full animate-ping"></div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-700">
          Đang đăng nhập...
        </h2>
        <p className="text-sm text-gray-500 mt-1">Vui lòng chờ trong giây lát</p>
      </motion.div>
    </div>
  );
};

export default LoadingModal;
