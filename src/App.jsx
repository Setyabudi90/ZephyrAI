import React, { useState } from "react";
import { Message } from "./Message";
import { requestToAI } from "./groq";

function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() !== "") {
      setLoading(true);
      setMessages([...messages, { text: question, isUser: true }]);

      const ai = await requestToAI(question);
      setData(ai);

      setMessages([
        ...messages,
        { text: question, isUser: true },
        { text: ai, isUser: false },
      ]);

      setTimeout(() => setLoading(false), 2000);
      setQuestion("");
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <header className="sticky flex flex-col items-center top-0 z-50 bg-gray-900 p-3 shadow-md border-b border-gray-600">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 gap-2">
          ZephyrAI
        </h1>
        <p className="text-gray-400">Wonderful AI powered with Groq API</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        {!data && !loading && messages.length === 0 && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-center text-gray-300 opacity-40 underline">
              Start your conversation with ZephyrAI
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex p-2 bg-gray-900 md:w-[50%] mx-auto w-full rounded sticky bottom-0"
      >
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-grow p-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
