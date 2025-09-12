import React, { useState } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4">Neue Bewertung schreiben</h3>

        {/* Sterne Auswahl */}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setStars(s)}
              className={`text-2xl ${
                s <= stars ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Textfeld */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Wie war deine Erfahrung?"
          className="w-full border rounded-md p-2 mb-4"
        />

        {/* Submit */}
        <button
          onClick={() => {
            console.log("Submit Review:", { stars, text });
            onClose();
          }}
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
        >
          Bewertung absenden
        </button>
      </div>
    </div>
  );
}
