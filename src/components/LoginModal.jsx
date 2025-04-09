import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const LoginModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-[#1a2333] p-6 rounded-lg shadow-xl w-96 text-white"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded bg-[#2b394a] border-gray-600 text-white" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded bg-[#2b394a] border-gray-600 text-white" />
        <button className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition">
          Login
        </button>
        <button onClick={onClose} className="mt-3 w-full text-gray-400 text-sm">
          Close
        </button>
      </motion.div>
    </div>,
    document.body
  );
};

export default React.memo(LoginModal);
