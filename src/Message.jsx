import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Message = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`${
          isUser
            ? "bg-gray-900 text-white"
            : "text-white md:max-w-2xl sm:max-w-[390px]"
        } rounded-lg p-3 shadow-md max-w-max break-words`}
      >
        <div className="flex flex-end mb-1">
          <span className="text-sm font-bold">
            <p
              className={`${
                isUser
                  ? "text-purple-600 font-bold text-xl underline decoration-slice decoration-inherit"
                  : "text-indigo-600 font-bold text-xl mb-2 underline decoration-slice decoration-inherit"
              }`}
            >
              {isUser ? "YOU" : "ZephyrAI"}
            </p>
          </span>
        </div>
        <Markdown
          children={message}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  node={rest.node.tagName}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dark}
                  className="sm:max-w-[340px] md:max-w-2xl"
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
  );
};
