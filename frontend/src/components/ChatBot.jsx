import React, { useState } from 'react';
import { Bot, Send, Loader2, Stethoscope } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([{
    content: "Hello! I'm your medical assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function splitString(inputString) {
    if (inputString.includes('[/INST]')) {
        return inputString.split('[/INST]');
    } else if (inputString.includes('[/]')) {
        return inputString.split('[/]');
    } else {
        return [inputString];  // Return the original string as an array
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      content: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt:input }),
        });

      const data = await response.json();
      const updatedresponse = splitString(data.response)
      setMessages(prev => [...prev, {
        content: updatedresponse[1],
        isBot: true,
        timestamp: new Date()
      }]);
      console.log(updatedresponse);
      console.log(updatedresponse[1]);
    }
     catch (error) {
      alert('error')
      setMessages(prev => [...prev, {
        content: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Medical Assistant</h1>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg min-h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? 'bg-blue-500' : 'bg-gray-200'
                    }`}>
                      {message.isBot ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-400" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="rounded-2xl px-4 py-2 bg-gray-100">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your medical question..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChatBot;
