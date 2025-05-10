"use client";
import { useChat } from '@ai-sdk/react';
import { useRef } from 'react';
import { TextAnimate } from "@/registry/magicui/TextAnimate";

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
    <div className="min-h-screen w-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex-1 w-full flex flex-col items-center justify-start overflow-y-auto">
        <div className="w-full flex flex-col items-center pt-8 pb-40">
          <div className="w-full max-w-[600px] flex flex-col gap-3">
            {messages.map((message) => (
              message.role === 'user' ? (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-[var(--stroke)] text-[var(--foreground)] px-4 py-2 rounded-lg max-w-[80%] text-right">
                    {message.parts.map((part, idx) => (
                      <span key={idx}>{part.type === 'text' ? part.text : null}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-start w-[600px]">
                  <div className="px-4 py-2 rounded-lg max-w-full text-left">
                    <TextAnimate animation="blurIn">
                      {message.parts.map((part, idx) =>
                        part.type === 'text' ? part.text : ''
                      ).join('')}
                    </TextAnimate>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[600px] flex gap-2 bg-[var(--background)] border border-[var(--stroke)] rounded-full shadow px-4 py-2 text-[var(--foreground)]"
        style={{ zIndex: 10 }}
      >
        <input
          ref={inputRef}
          className="flex-1 h-12 rounded-full border-none outline-none px-4 bg-transparent text-[var(--foreground)] placeholder:text-[var(--foreground)]"
          style={{ minHeight: 48, maxHeight: 48 }}
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={status !== 'ready'}
          autoFocus
        />
        <button
          type="submit"
          className="w-12 h-12 aspect-square bg-blue-500 text-white rounded-full flex items-center justify-center disabled:opacity-30 p-0"
          disabled={status !== 'ready' || !input.trim()}
          aria-label="Send"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--stroke)' }} className="lucide lucide-arrow-up-icon lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
        </button>
      </form>
    </div>
  );
}
