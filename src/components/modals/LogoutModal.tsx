"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logout, setLoading } from "@/store/authSlice";
import { authService } from "@/features/auth/services/authService";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * LogoutModal Component
 *
 * A confirmation dialog for logging out users.
 * Features:
 * - Framer Motion animations (fade-in/scale-up)
 * - Backend logout API call
 * - Redux state cleanup
 * - Automatic redirect to login page
 */
const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    dispatch(setLoading(true)); // Set global loading state

    try {
      // Call backend logout API to clear refresh token cookie
      await authService.logout();
    } catch (error) {
      // Even if backend call fails, proceed with frontend logout
      console.error("Logout API error (proceeding anyway):", error);
    } finally {
      // Clear Redux state (in-memory access token)
      // logout() already sets isLoading to false
      dispatch(logout());

      // Close modal
      onClose();

      // Redirect to login page
      router.push("/login");
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        duration: 0.3,
        bounce: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="relative w-full max-w-md rounded-3xl bg-[var(--modal-bg-primary)] border border-[var(--modal-border)] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content */}
            <div className="px-8 py-10">
              {/* Heading */}
              <h2 className="text-center text-2xl font-bold text-[var(--modal-text-secondary)] mb-3">
                Log out?
              </h2>

              {/* Description */}
              <p className="text-center text-[var(--modal-text-primary)] text-sm mb-8 leading-relaxed">
                Are you sure you want to log out?
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[var(--modal-divider)] mb-6" />

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {/* Log out Button (Destructive) */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full py-3 px-4 rounded-2xl font-semibold text-sm text-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    backgroundColor: "#ef4444", // Red-500
                    color: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoggingOut) {
                      e.currentTarget.style.backgroundColor = "#dc2626"; // Red-600
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoggingOut) {
                      e.currentTarget.style.backgroundColor = "#ef4444"; // Red-500
                    }
                  }}
                >
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </button>

                {/* Cancel Button */}
                <button
                  onClick={onClose}
                  disabled={isLoggingOut}
                  className="w-full py-3 px-4 rounded-2xl bg-[var(--modal-btn-bg)] text-[var(--modal-text-secondary)] font-semibold text-sm text-center border border-[var(--modal-border)] hover:border-[var(--modal-border-hover)] hover:bg-[var(--modal-bg-secondary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default LogoutModal;
