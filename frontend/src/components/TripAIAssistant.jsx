// src/components/TripAIAssistant.jsx
import React, { useState } from "react";
import { axiosInstance } from "@/api";
import { toast } from "react-toastify";

const TripAIAssistant = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!input) return toast.error("Please enter some trip preferences");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/ai/suggest", { prompt: input });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      toast.error("Failed to get suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">🧠 Trip Suggestions Assistant</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. Beach vacation for 4 friends in December"
        rows="4"
        className="w-full border rounded p-2 mb-4"
      ></textarea>
      <button
        onClick={handleSuggest}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Getting suggestions..." : "Get Suggestions"}
      </button>

      {suggestions && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow-inner">
          <h4 className="font-semibold mb-2">Suggested Trips:</h4>
          <pre className="whitespace-pre-wrap text-gray-700">{suggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default TripAIAssistant;
