import React from "react";
import SignIn from "./SignIn";

const Appbar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <SignIn />
    </header>
  );
};

export default Appbar;
