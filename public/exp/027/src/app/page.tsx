import ChatBar from "@/components/ChatBar";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--n1)] p-8">
      <div className="w-full max-w-[700px] h-[450px]">
        <ChatBar />
      </div>
    </div>
  );
}

