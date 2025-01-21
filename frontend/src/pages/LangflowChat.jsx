import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './langflow.css'
import bot from '../assets/chatbot.jpg'

export default function LangflowChat() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What are the symptoms of diabetes?",
    "How can I improve my mental health?",
    "What is a balanced diet?",
    "What exercises are good for heart health?"
  ]); // Predefined suggested questions
  const [isBotTyping, setIsBotTyping] = useState(false); // Track bot typing state
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setConversation((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    setError("");
    setIsBotTyping(true); // Set bot typing state to true

    try {
      const response = await axios.post("http://localhost:3000/api/message", { message });
      const botResponse = {
        role: "bot",
        content: response.data || "Sorry, it is out of my context question, please ask health-related question",
      };
      setConversation((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsBotTyping(false); // Set bot typing state to false after the bot response
      setLoading(false);
    }
  };

  const handleSuggestedQuestionClick = (question) => {
    setMessage(question);
    handleSubmit(new Event("submit"));
  };

  const renderMarkdown = (content) => {
    return (
      <ReactMarkdown
        className="prose prose-invert custom-markdown-table"
        children={content}
        remarkPlugins={[remarkGfm]}
      />
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 min-h-[90vh] max-h-[90vh] flex flex-col">
      {/* Chat container */}
      <div className="flex-1 mb-6 bg-gray-900 rounded-lg p-4 overflow-y-scroll custom-scrollbar">
        {conversation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div>Enter your query below to start analyzing</div>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.map((entry, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  entry.role === "user" ? "bg-blue-700 text-white" : "bg-gray-800 text-gray-300"
                }`}
              >
                <div className="flex gap-2 items-center">
                  {entry.role === "bot" && !isBotTyping && (
                    <img
                      src={bot}
                      alt="Bot Logo"
                      className="h-8 w-8 object-contain bg-green-500 rounded-2xl"
                    />
                  )}
                  {entry.role === "user" ? "You:" : ""}
                </div>
                {renderMarkdown(entry.content)}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-800 p-4 rounded-lg text-gray-400 flex items-center gap-2">
                <img
                  src={bot}
                  alt="Bot Logo"
                  className="h-8 w-8 object-contain bg-transparent rounded-2xl"
                />
                ChiranJivi is thinking...
              </div>
            )}
            <div ref={scrollRef}></div>
          </div>
        )}
      </div>

      {/* Suggested Questions - Only display when no conversation */}
      {conversation.length === 0 && (
        <div className="mb-4 space-y-2">
          <h3 className="text-gray-300">Suggested Questions:</h3>
          <div className="space-x-5">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestionClick(question)}
                className="bg-blue-500 text-white px-4 py-2 mx-5 my-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your analysis query..."
          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500"
          } text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center`}
        >
          <MdSend className="h-5 w-5 mr-2" />
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
}
