import BrowserWindow from "@/components/BrowserWindow";

export default function Page() {
  const windows = Array.from({ length: 9 }, (_, i) => i - 4);
  const tiltPerStep = 12;

  return (
    <div
      className="w-full flex items-center justify-center bg-[var(--n3)] p-8"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full h-full flex flex-col gap-[80px]">
        <div className="flex min-w-full flex-nowrap items-center justify-center gap-[80px]">
          {windows.map((offset) => (
            <div
              key={offset}
              className="h-[260px] w-[380px] flex-shrink-0"
              style={{ perspective: "50000px" }}
            >
              <BrowserWindow initialRotation={-offset * tiltPerStep} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

