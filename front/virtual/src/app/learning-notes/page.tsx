"use client";

import { useEffect, useState } from "react";

interface VocabularyItem {
  id: number;
  korean: string;
  english: string;
  dateAdded: Date;
  context?: string;
  mastered: boolean;
}

interface SentenceItem {
  id: number;
  originalText: string;
  translatedText: string;
  timestamp: string;
  type: "sentence";
}

export default function LearningNotesPage() {
  const [activeTab, setActiveTab] = useState<"words" | "sentences">("words");
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([
    {
      id: 1,
      korean: "도서관",
      english: "library",
      dateAdded: new Date("2024-10-25"),
      context: "I want to go to the library to study",
      mastered: false,
    },
    {
      id: 2,
      korean: "감사합니다",
      english: "thank you",
      dateAdded: new Date("2024-10-26"),
      context: "Thank you for your help",
      mastered: true,
    },
    {
      id: 3,
      korean: "학교",
      english: "school",
      dateAdded: new Date("2024-10-27"),
      context: "I go to school every day",
      mastered: false,
    },
  ]);

  const [sentences, setSentences] = useState<SentenceItem[]>([]);
  const [filterMastered, setFilterMastered] = useState<
    "all" | "learning" | "mastered"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load sentences from localStorage
  useEffect(() => {
    const loadLearningNotes = () => {
      try {
        const existingNotes = localStorage.getItem("learningNotes");
        if (existingNotes) {
          const notes = JSON.parse(existingNotes);
          if (notes.sentences) {
            setSentences(notes.sentences);
          }
        }
      } catch (error) {
        console.error("Failed to load learning notes:", error);
      }
    };

    loadLearningNotes();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadLearningNotes();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMastered = (id: number) => {
    setVocabulary((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, mastered: !item.mastered } : item
      )
    );
  };

  const filteredVocabulary = vocabulary.filter((item) => {
    const matchesFilter =
      filterMastered === "all" ||
      (filterMastered === "learning" && !item.mastered) ||
      (filterMastered === "mastered" && item.mastered);

    const matchesSearch =
      item.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.english.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filteredSentences = sentences.filter((item) => {
    const matchesSearch =
      item.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translatedText.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter((item) => item.mastered).length,
    learning: vocabulary.filter((item) => !item.mastered).length,
    sentences: sentences.length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-white">
              Learning Notes
            </h1>
            <p className="text-gray-300">
              Track your vocabulary progress and review words you've learned
              through chat
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="/learning-notes/memory-palace"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-center shadow-lg transform hover:scale-105"
            >
              Memory Palace
            </a>
            <div className="text-xs text-gray-400 text-center">
              카드 뒤집기 게임!
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
          <div className="text-sm text-gray-300">Total Words</div>
        </div>
        <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">
            {stats.mastered}
          </div>
          <div className="text-sm text-gray-300">Mastered</div>
        </div>
        <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {stats.learning}
          </div>
          <div className="text-sm text-gray-300">Learning</div>
        </div>
        <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">
            {stats.sentences}
          </div>
          <div className="text-sm text-gray-300">Saved Sentences</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("words")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "words"
                ? "bg-emerald-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            Words ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab("sentences")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "sentences"
                ? "bg-emerald-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            Sentences ({stats.sentences})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-600 p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={
                activeTab === "words"
                  ? "Search vocabulary..."
                  : "Search sentences..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
            />
          </div>
          {activeTab === "words" && (
            <div className="flex gap-2">
              <button
                onClick={() => setFilterMastered("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterMastered === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMastered("learning")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterMastered === "learning"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                Learning
              </button>
              <button
                onClick={() => setFilterMastered("mastered")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterMastered === "mastered"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                Mastered
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "words" ? (
          // Words Tab Content
          <>
            {filteredVocabulary.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {searchTerm
                  ? "No vocabulary found matching your search."
                  : "No vocabulary words yet. Start chatting to add some!"}
              </div>
            ) : (
              filteredVocabulary.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-medium text-white">
                          {item.korean}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="text-lg font-medium text-emerald-400">
                          {item.english}
                        </span>
                      </div>
                      {item.context && (
                        <div className="text-gray-300 text-sm mb-2">
                          <span className="font-medium">Used in:</span> "
                          {item.context}"
                        </div>
                      )}
                      <div className="text-xs text-gray-400">
                        Added on {item.dateAdded.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.mastered
                            ? "bg-green-600 text-white"
                            : "bg-amber-600 text-white"
                        }`}
                      >
                        {item.mastered ? "Mastered" : "Learning"}
                      </span>
                      <button
                        onClick={() => toggleMastered(item.id)}
                        className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        {item.mastered
                          ? "Mark as Learning"
                          : "Mark as Mastered"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          // Sentences Tab Content
          <>
            {filteredSentences.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {searchTerm
                  ? "No sentences found matching your search."
                  : "No saved sentences yet. Save sentences from your chat conversations!"}
              </div>
            ) : (
              filteredSentences.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-600"
                >
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-emerald-400 mb-1">
                        Original (Korean):
                      </p>
                      <p className="text-gray-200 bg-gray-700 p-3 rounded border-l-4 border-emerald-500">
                        {item.originalText}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-400 mb-1">
                        Translation (English):
                      </p>
                      <p className="text-gray-200 bg-gray-700 p-3 rounded border-l-4 border-blue-500">
                        {item.translatedText}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>
                        Saved on {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-8 bg-gray-800 border border-gray-600 p-4 rounded-lg">
        <h3 className="font-semibold text-emerald-400 mb-2">How it works</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>
            • <strong>Words:</strong> When you type Korean words in chat,
            they're automatically translated and saved here
          </li>
          <li>
            • <strong>Sentences:</strong> Use the dropdown in chat to save
            original and translated sentence pairs
          </li>
          <li>
            • Review your vocabulary and sentences regularly to improve
            retention
          </li>
          <li>• Mark words as "Mastered" when you're confident using them</li>
          <li>• Use the search and filter options to find specific content</li>
        </ul>
      </div>
    </div>
  );
}
