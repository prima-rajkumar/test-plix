
export default function CartHeader() {
  const handleBackClick = (e: MouseEvent) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <header className="bg-ui-primary px-4 py-3.5 border-b border-white">
      <div className="flex justify-between items-center">
        <div className="logo">
          <a href="/" className="cursor-pointer">
            <img
              src={"/assets/images/icon.svg"}
              alt="PLIX"
              className="h-6 w-20"
              height="24"
              width="80"
              loading={'lazy'}
            />
          </a>
        </div>
        <a
          href="#"
          onClick={handleBackClick}
          className="cursor-pointer relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="none"
          >
            <rect
              x="0.666992"
              y="0.359375"
              width="24.8023"
              height="25.8044"
              fill="#5DD37C"
            />
            <mask
              id="mask0_464_2030"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="26"
              height="27"
            >
              <rect
                x="0.165039"
                y="0.609375"
                width="25.5539"
                height="25.5539"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_464_2030)">
              <path
                d="M6.60742 20.9284L5.11816 19.4369L11.0752 13.471L5.11816 7.50515L6.60742 6.01367L12.5644 11.9796L18.5215 6.01367L20.0107 7.50515L14.0537 13.471L20.0107 19.4369L18.5215 20.9284L12.5644 14.9625L6.60742 20.9284Z"
                fill="white"
              />
            </g>
          </svg>
        </a>
      </div>
    </header>
  );
}