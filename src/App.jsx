import "./App.css";
import { requestToAI } from "./groq";
import { useState } from "react";
import { Message } from "./Message";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

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
    <>
      <div className="header mb-5">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 gap-2">
          ZephyrAI
        </h1>
        <p className="text-white">Wonderful AI powered with Groq API</p>
      </div>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center w-full mx-auto max-w-3xl  text-gray-200 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <div className="flex-grow overflow-y-auto p-4">
            {loading ? (
              <div className="text-white justify-center">Loading...</div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <Message key={index} message={msg.text} isUser={msg.isUser} />
                ))}
                {!data && !loading && messages.length === 0 && (
                  <p className="text-center text-gray-300 opacity-40">
                    Start your conversation with ZephyrAI
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-4 mt-6 w-full" onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything"
          className="bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-4 outline-none resize-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md py-2 px-4 font-bold hover:bg-gradient-to-l hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out bottom-0"
        >
          Send
        </button>
      </form>
    </>
  );
}

export default App;
