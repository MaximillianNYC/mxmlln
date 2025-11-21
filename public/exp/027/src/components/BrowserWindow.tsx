 "use client";

import { useState } from "react";

type BrowserWindowProps = {
  initialRotation?: number;
};

export default function BrowserWindow({ initialRotation = 0 }: BrowserWindowProps) {
  const [spin, setSpin] = useState(0);
  const trafficLightColors = ["#FF5F56", "#FFBD2E", "#27C93F"];
  const dropShadow =
    "0 481px 135px 0 rgba(0, 0, 0, 0.00), 0 308px 123px 0 rgba(0, 0, 0, 0.01), 0 173px 104px 0 rgba(0, 0, 0, 0.05), 0 77px 77px 0 rgba(0, 0, 0, 0.09), 0 19px 42px 0 rgba(0, 0, 0, 0.10)";

  const handleSpin = () => {
    setSpin((prev) => prev + 360);
  };

  const totalRotation = initialRotation + spin;

  return (
    <div
      className="h-full w-full cursor-pointer rounded-[20px] border border-[var(--n4)] bg-[var(--n2)]"
      onClick={handleSpin}
      style={{
        boxShadow: dropShadow,
        transition: "transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: `perspective(1400px) rotateY(${totalRotation}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex h-full flex-col rounded-[20px] p-1">
        <div className="flex items-center px-3 py-3">
          <div className="flex items-center gap-2">
            {trafficLightColors.map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-[16px] border border-[var(--n3)] bg-[var(--n1)] mt-0.5" />
      </div>
    </div>
  );
}