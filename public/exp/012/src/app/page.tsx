"use client";
import { useChat } from '@ai-sdk/react';
import { useRef } from 'react';

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    onFinish: () => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    },
  });

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <div className="flex-1 w-full flex flex-col items-center justify-start overflow-y-auto">
        <div className="w-full flex flex-col items-center pt-8 pb-40">
          <div className="w-full max-w-[600px]">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <span className={message.role === 'user' ? 'text-blue-600 font-semibold' : 'text-green-700 font-semibold'}>
                  {message.role}:
                </span>{' '}
                {message.parts.map((part, idx) => (
                  <span key={idx}>{part.type === 'text' ? part.text : null}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[600px] flex gap-2 bg-white border rounded shadow px-4 py-2"
        style={{ zIndex: 10 }}
      >
        <input
          ref={inputRef}
          className="flex-1 border-none outline-none px-2 py-1 bg-transparent"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={status !== 'ready'}
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
          disabled={status !== 'ready' || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
