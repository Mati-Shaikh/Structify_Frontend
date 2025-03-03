import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Check } from "lucide-react";

const SupportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add this effect to handle body scrolling and apply blur to navbar
  useEffect(() => {
    if (isOpen) {
      // When modal opens, add blur class to navbar and prevent scrolling
      document.body.style.overflow = "hidden";
      const navbar = document.querySelector("nav");
      if (navbar) {
        navbar.classList.add("modal-open-blur");
      }
    } else {
      // When modal closes, remove blur and restore scrolling
      document.body.style.overflow = "";
      const navbar = document.querySelector("nav");
      if (navbar) {
        navbar.classList.remove("modal-open-blur");
      }
    }

    // Cleanup function to ensure we restore the original state
    return () => {
      document.body.style.overflow = "";
      const navbar = document.querySelector("nav");
      if (navbar) {
        navbar.classList.remove("modal-open-blur");
      }
    };
  }, [isOpen]);

  const handleSubmitSupport = async () => {
    if (message.trim()) {
      setIsSubmitting(true);
  
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3005/api/users/submitSupport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ message }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit support request");
        }
  
        setTimeout(() => {
          setIsSubmitting(false);
          setIsOpen(false);
          setMessage(""); // Reset the message field for next time
        }, 2500);
      } catch (error) {
        console.error("Error submitting support request:", error);
        setIsSubmitting(false);
      }
    }
  };  

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-[90]">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
      >
        <MessageSquare size={20} />
        Need Help?
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[100]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
            >
              <button
                onClick={() => {
                  if (!isSubmitting) {
                    setIsOpen(false);
                  }
                }}
                className={`absolute top-4 right-4 text-gray-500 transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:text-gray-700"
                }`}
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
                <p className="text-gray-600">
                  Describe your issue and we'll get back to you as soon as possible.
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  disabled={isSubmitting}
                />
                <button
                  onClick={handleSubmitSupport}
                  disabled={!message.trim() || isSubmitting}
                  className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? "bg-green-500 text-white" 
                      : message.trim() 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Check size={20} />
                      Request Submitted
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportModal;