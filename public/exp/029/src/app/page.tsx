"use client";

export default function Page() {
  return (
    <div className="h-screen w-screen min-h-screen min-w-full overflow-hidden m-0 p-0">
      <svg
        className="fixed top-0 left-0 w-screen h-screen"
        style={{
          mask: "url(#circleMask)",
          WebkitMask: "url(#circleMask)",
        }}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="circleMask">
            <rect width="100%" height="100%" fill="black" />
            <circle
              id="maskCircle"
              cx="50%"
              cy="50%"
              fill="white"
              className="origin-center animate-shrink-circle blur-[10px]"
              style={{ transformOrigin: "center" }}
            />
          </mask>
        </defs>
        <image
          href="/bg.png"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}

