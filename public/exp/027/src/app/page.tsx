import BrowserWindow from "@/components/BrowserWindow";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--n3)] p-8">
      <div className="w-full max-w-[700px] h-[450px]">
        <BrowserWindow />
      </div>
    </div>
  );
}

