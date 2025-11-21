import BrowserWindow from "@/components/BrowserWindow";

export default function Page() {
  const windows = Array.from({ length: 7 }, (_, i) => i - 4).reverse();
  const overlap = 220;

  return (
    <div
      className="w-full flex items-center justify-center bg-[var(--n3)] p-8"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full h-full">
        <div className="flex min-w-full flex-nowrap items-center justify-center">
          {windows.map((offset, idx) => (
            <div
              key={offset}
              className="h-[260px] w-[360px] flex-shrink-0"
              style={{
                marginLeft: idx === 0 ? 0 : -overlap,
                zIndex: windows.length - idx,
              }}
            >
              <BrowserWindow />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

