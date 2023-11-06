const HeaderPokeball = () => {
  return (
    <header>
      <div className="bg-[#DD1A1A] h-[100px] w-full relative">
        <div className="absolute z-10 left-[10%] top-[40%] h-[75px]">
          <img className="h-full " src="/images/logo.png" alt="Pokemon logo" />
        </div>
      </div>
      <div className="bg-[#0C0C0C] h-[50px] w-full relative">
        <div className="w-[100px] h-[100px] absolute right-[5%] top-[-67%] -translate-x-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="117"
            height="117"
            viewBox="0 0 117 117"
            fill="none"
          >
            <circle
              cx="58.5"
              cy="58.5"
              r="52.5"
              fill="white"
              stroke="black"
              strokeWidth="12"
            />
            <circle
              cx="58.5"
              cy="58.5"
              r="25.5"
              fill="#212121"
              stroke="black"
              strokeWidth="12"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default HeaderPokeball;
