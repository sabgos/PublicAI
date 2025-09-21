import React, { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("hi"); // default Hindi

  const sendMessage = async () => {
    if (!message) return;
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setHistory([...history, { user: message, ai: data.response }]);
    setMessage("");
  };

  const translateText = async (text) => {
    const res = await fetch("http://localhost:5000/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang: language }),
    });
    const data = await res.json();
    return data.translated_text;
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // set TTS language
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">HealthTrust Chat</h1>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {history.map((chat, idx) => (
          <div key={idx} className="mb-3">
            <p className="font-semibold text-blue-600">You: {chat.user}</p>
            <p className="font-semibold text-green-600">AI: {chat.ai}</p>

            <button
              className="mr-2 text-sm text-white bg-blue-500 px-2 py-1 rounded"
              onClick={async () => {
                const t = await translateText(chat.ai);
                alert("Translated: " + t);
              }}
            >
              Translate
            </button>

            <button
              className="text-sm text-white bg-green-500 px-2 py-1 rounded"
              onClick={async () => {
                const t = await translateText(chat.ai);
                speakText(t);
              }}
            >
              Speak
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg p-2"
          placeholder="Type a health claim..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>

      <div className="mt-2">
        <label className="mr-2">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-1"
        >
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
  );
}
