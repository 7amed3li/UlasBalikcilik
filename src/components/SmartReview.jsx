"use client";

import React, { useState } from "react";
import { TbStarFilled as Star, TbX as X, TbMapPin as MapPin } from "react-icons/tb";
import { useAppContext } from "../context/AppContext";

export default function SmartReview({ onClose }) {
  const { t, lang, isRtl } = useAppContext();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleRate = (val) => {
    setRating(val);
  };

  const handleSubmit = () => {
    if (rating >= 4) {
      // SMART ROUTING: Redirect to the platform that currently needs a boost
      // Example logic: We alternate between Google Maps and TripAdvisor based on some external fetch,
      // Here we hardcode to Google Maps for demo purposes.
      window.open("https://g.page/r/your-google-maps-link/review", "_blank");
      setSubmitted(true);
    } else {
      // Poor rating: Show internal feedback form to prevent public bad reviews
      setSubmitted(true);
    }
  };

  if (submitted && rating < 4) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-[#082A3A] border border-white/10 rounded-3xl p-6 max-w-sm w-full relative">
          <button onClick={onClose} aria-label="Close modal" className="absolute top-4 end-4 text-gray-300 hover:text-white">
            <X size={20} />
          </button>
          <h3 className="text-xl font-bold text-white mb-2 text-center">We value your feedback</h3>
          <p className="text-gray-300 text-sm mb-4 text-center">
            We are sorry to hear your experience was not perfect. Please let us know what went wrong so we can fix it immediately.
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what happened..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#EE7B3F] h-32 resize-none mb-4"
          ></textarea>
          <button onClick={onClose} className="w-full bg-[#EE7B3F] hover:bg-[#D15015] text-black font-bold py-3 rounded-xl">
            {t.submitFeedback}
          </button>
        </div>
      </div>
    );
  }

  if (submitted && rating >= 4) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-[#082A3A] border border-white/10 rounded-3xl p-6 max-w-sm w-full relative text-center">
          <button onClick={onClose} aria-label="Close modal" className="absolute top-4 end-4 text-gray-300 hover:text-white">
            <X size={20} />
          </button>
          <div className="w-16 h-16 bg-[#EE7B3F]/20 text-[#EE7B3F] rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={32} fill="currentColor" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
          <p className="text-gray-300 text-sm">Your review has been directed to our public platforms. We appreciate your support!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#082A3A] border border-white/10 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl">
        <button onClick={onClose} aria-label="Close modal" className="absolute top-4 end-4 text-gray-300 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t.rateUs}</h2>
          <p className="text-sm text-gray-300">How was your experience at Ulaş Balıkçılık?</p>
        </div>

        <div className={`flex justify-center gap-2 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              aria-label={`Rate ${star} stars`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRate(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={40}
                className={`transition-colors ${(hoverRating || rating) >= star
                    ? "text-[#EE7B3F]"
                    : "text-white/10"
                  }`}
                fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>

        {rating > 0 && (
          <button
            onClick={handleSubmit}
            className="w-full bg-[#EE7B3F] hover:bg-[#D15015] text-black font-bold py-3 rounded-xl shadow-lg shadow-[#EE7B3F]/20 hover:scale-[1.02] transition-transform animate-in fade-in slide-in-from-bottom-4"
          >
            {rating >= 4 ? "Rate on Google Maps" : "Leave Feedback"}
          </button>
        )}
      </div>
    </div>
  );
}
