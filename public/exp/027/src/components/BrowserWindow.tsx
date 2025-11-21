export default function BrowserWindow() {
  const trafficLightColors = ["#FF5F56", "#FFBD2E", "#27C93F"];
  const dropShadow =
    "0 481px 135px 0 rgba(0, 0, 0, 0.00), 0 308px 123px 0 rgba(0, 0, 0, 0.01), 0 173px 104px 0 rgba(0, 0, 0, 0.05), 0 77px 77px 0 rgba(0, 0, 0, 0.09), 0 19px 42px 0 rgba(0, 0, 0, 0.10)";

  return (
    <div
      className="w-full h-full rounded-[20px] border border-[var(--n4)] bg-[var(--n2)]"
      style={{ boxShadow: dropShadow }}
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