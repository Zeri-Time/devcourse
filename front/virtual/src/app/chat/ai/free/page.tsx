"use client";

import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  originalText?: string; // For Korean input before translation
}

interface Feedback {
  id: number;
  type: "grammar" | "vocabulary" | "pronunciation" | "general";
  message: string;
  timestamp: Date;
}

export default function FreeChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI English tutor. Feel free to chat with me in English, or type Korean words when you don't know the English equivalent!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

  // Mock translation function - would connect to real translation API
  const translateKoreanToEnglish = async (text: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple mock translation (in real app, this would use actual translation service)
    const koreanWords: { [key: string]: string } = {
      안녕하세요: "hello",
      감사합니다: "thank you",
      도서관: "library",
      학교: "school",
      음식: "food",
      물: "water",
      책: "book",
    };

    let translatedText = text;
    let translatedWords: string[] = [];

    Object.entries(koreanWords).forEach(([korean, english]) => {
      if (text.includes(korean)) {
        translatedText = translatedText.replace(korean, english);
        translatedWords.push(`${korean} → ${english}`);
      }
    });

    return { translatedText, translatedWords };
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    // Check if message contains Korean and translate
    const { translatedText, translatedWords } = await translateKoreanToEnglish(
      inputText
    );

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: translatedText,
      sender: "user",
      timestamp: new Date(),
      originalText: translatedText !== inputText ? inputText : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: `Great! I understood your message. ${
          translatedWords.length > 0
            ? `I helped translate: ${translatedWords.join(
                ", "
              )}. These words have been added to your learning notes!`
            : ""
        }`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);

    setInputText("");
    setIsTranslating(false);
  };

  const getFeedback = async () => {
    if (messages.length <= 1) return; // No user messages to analyze

    setIsGettingFeedback(true);

    // Simulate AI analysis of conversation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockFeedbacks: Feedback[] = [
      {
        id: Date.now(),
        type: "grammar",
        message:
          "Consider using 'I have been learning' instead of 'I am learning' when talking about ongoing activities that started in the past.",
        timestamp: new Date(),
      },
      {
        id: Date.now() + 1,
        type: "vocabulary",
        message:
          "Great use of vocabulary! Try using synonyms like 'fascinating' or 'intriguing' instead of always saying 'interesting'.",
        timestamp: new Date(),
      },
      {
        id: Date.now() + 2,
        type: "general",
        message:
          "Your conversation flow is natural! Keep practicing expressing your opinions with phrases like 'In my opinion' or 'I believe that'.",
        timestamp: new Date(),
      },
    ];

    setFeedbackList((prev) => [...mockFeedbacks, ...prev]);
    setIsGettingFeedback(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getFeedbackTypeIcon = (type: Feedback["type"]) => {
    switch (type) {
      case "grammar":
        return "📝";
      case "vocabulary":
        return "📚";
      case "pronunciation":
        return "🗣️";
      default:
        return "💡";
    }
  };

  const getFeedbackTypeColor = (type: Feedback["type"]) => {
    switch (type) {
      case "grammar":
        return "text-blue-400";
      case "vocabulary":
        return "text-green-400";
      case "pronunciation":
        return "text-purple-400";
      default:
        return "text-amber-400";
    }
  };

  return (
    <div className="flex h-full bg-gray-800">
      {/* Main Chat Area - 2/3 width */}
      <div className="flex flex-col w-2/3 border-r border-gray-700">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg">🗣️</span>
              </div>
              <div>
                <h1 className="font-semibold text-white">Free Chat</h1>
                <p className="text-sm text-gray-300">
                  Casual conversation practice
                </p>
              </div>
            </div>
            <button
              onClick={getFeedback}
              disabled={isGettingFeedback || messages.length <= 1}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isGettingFeedback ? "Analyzing..." : "Get Feedback"}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
          style={{
            maxHeight: "calc(100vh - 220px)",
            scrollbarWidth: "thin",
            scrollbarColor: "#4B5563 transparent",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 text-gray-200 shadow-sm border border-gray-600"
                }`}
              >
                {message.originalText && (
                  <div className="text-xs opacity-75 mb-1">
                    Original: {message.originalText}
                  </div>
                )}
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-gray-900 border-t border-gray-700 p-4 flex-shrink-0">
          <div className="flex space-x-3 items-end">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (You can mix Korean and English!)"
              className="flex-1 border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm placeholder-gray-400 overflow-hidden"
              rows={2}
              style={{ minHeight: "60px", maxHeight: "120px", height: "auto" }}
              disabled={isTranslating}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "60px";
                target.style.height = Math.min(target.scrollHeight, 120) + "px";
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isTranslating}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              style={{ minHeight: "60px" }}
            >
              {isTranslating ? "..." : "Send"}
            </button>
          </div>
          <p className="text-xs text-gray-300 mt-2">
            Tip: Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Feedback Panel - 1/3 width */}
      <div className="flex flex-col w-1/3 bg-gray-850">
        {/* Feedback Header */}
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm">💡</span>
            </div>
            <div>
              <h2 className="font-semibold text-white">AI Feedback</h2>
              <p className="text-xs text-gray-400">
                Personalized learning insights
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {feedbackList.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-4">🤖</div>
              <p className="text-sm">
                Start chatting and click "Get Feedback" to receive personalized
                learning insights!
              </p>
            </div>
          ) : (
            feedbackList.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-gray-800 border border-gray-600 rounded-lg p-4"
              >
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">
                    {getFeedbackTypeIcon(feedback.type)}
                  </span>
                  <span
                    className={`text-sm font-semibold capitalize ${getFeedbackTypeColor(
                      feedback.type
                    )}`}
                  >
                    {feedback.type}
                  </span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-2">
                  {feedback.message}
                </p>
                <p className="text-xs text-gray-500">
                  {feedback.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Feedback Actions */}
        <div className="bg-gray-900 border-t border-gray-700 p-4 flex-shrink-0">
          <button
            onClick={() => setFeedbackList([])}
            disabled={feedbackList.length === 0}
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Clear Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
