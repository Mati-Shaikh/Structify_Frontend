import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Frown, Meh, ThumbsUp, Heart, X, MessageSquare, Send, HelpCircle } from "lucide-react";

const feedbackOptions = [
  { icon: <Smile size={32} className="text-green-500" />, label: "Happy" },
  { icon: <Heart size={32} className="text-red-500" />, label: "Love it" },
  { icon: <Meh size={32} className="text-yellow-500" />, label: "Okay" },
  { icon: <Frown size={32} className="text-blue-500" />, label: "Sad" },
  { icon: <ThumbsUp size={32} className="text-purple-500" />, label: "Interesting" },
];

const FeedbackAndSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showSupport, setShowSupport] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmitSupport = () => {
    if (message.trim()) {
      setToastMessage("Support request submitted successfully!");
      setShowToast(true);
      setMessage("");
      setTimeout(() => {
        setShowToast(false);
        setIsOpen(false);
      }, 3000);
    }
  };

  const handleFeedbackSubmit = (label) => {
    setSelectedFeedback(label);
    setToastMessage("Thank you for your feedback!");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setIsOpen(false);
      setSelectedFeedback(null);
    }, 3000);
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          {toastMessage}
        </motion.div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
      >
        <MessageSquare size={20} />
        Feedback & Support
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowSupport(false);
                  setSelectedFeedback(null);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setShowSupport(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    !showSupport
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Feedback
                </button>
                <button
                  onClick={() => setShowSupport(true)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    showSupport
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Support
                </button>
              </div>

              {showSupport ? (
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
                  />
                  <button
                    onClick={handleSubmitSupport}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Submit Request
                  </button>
                </div>
              ) : selectedFeedback ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <ThumbsUp size={40} className="text-blue-600" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                  <p className="text-gray-600">
                    We greatly appreciate your feedback. It helps us improve our services for everyone.
                  </p>
                </motion.div>
              ) : (
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">How was your experience?</h3>
                    <p className="text-gray-600 mt-2">Your feedback helps us improve!</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {feedbackOptions.map(({ icon, label }, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFeedbackSubmit(label)}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        {icon}
                        <span className="text-sm text-gray-600">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackAndSupport;