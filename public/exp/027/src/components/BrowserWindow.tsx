const imgFrame2018781867 =
  "http://localhost:3845/assets/ced84d6159d42022779f0a1698a3993da9e9690e.svg";

export default function BrowserWindow() {
  return (
    <div
      className="bg-[var(--n2,#f8fbff)] border border-[var(--n4,#cfdcf2)] border-solid relative rounded-[20px] size-full"
      data-name="Chat Bar"
      data-node-id="8988:53177"
      style={{
        boxShadow:
          "0 481px 135px 0 rgba(0, 0, 0, 0.00), 0 308px 123px 0 rgba(0, 0, 0, 0.01), 0 173px 104px 0 rgba(0, 0, 0, 0.05), 0 77px 77px 0 rgba(0, 0, 0, 0.09), 0 19px 42px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[4px] relative rounded-[inherit] size-full">
        <div
          className="box-border content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-[692px]"
          data-name="Row"
          data-node-id="8988:53179"
        >
          <div className="h-[14px] relative shrink-0 w-[58px]" data-node-id="8988:53219">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgFrame2018781867}
            />
          </div>
        </div>
        <div
          className="bg-[var(--n1,#f4f7ff)] border border-[var(--n3,#e4edf7)] border-solid h-[385px] rounded-[16px] shrink-0 w-full"
          data-name="Body"
          data-node-id="8988:53195"
        />
      </div>
    </div>
  );
}