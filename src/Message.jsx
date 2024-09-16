import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Message = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex flex-col max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full`}
      >
        {/* Indicator Label */}
        <div
          className={`text-xs font-semibold mb-1 ${
            isUser ? "text-blue-300" : "text-green-300"
          }`}
        >
          {isUser ? "You" : "ZephyrAI"}
        </div>
        <div
          className={`bg-gray-800 p-4 rounded-lg shadow-md ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          <Markdown
            children={message}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={dark}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
