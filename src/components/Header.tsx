import React from "react";
import StreamAiLogo from "../assets/icons/streamAiLogo.svg?react";

const Header: React.FC = () => {
  return (
    <div className="absolute px-4 sm:px-8 py-2 bg-linear-to-b from-black w-full z-10">
      <StreamAiLogo className="mx-auto sm:mx-20 w-32 sm:w-44" />
    </div>
  );
};

export default Header;
