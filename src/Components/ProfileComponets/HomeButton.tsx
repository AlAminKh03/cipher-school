import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {};

const HomeButton = (props: Props) => {
  const navigate = useNavigate();
  const navigateHomepage = () => {
    navigate("/");
  };
  return (
    <div>
      <div
        className="fixed left-6 top-10 w-10 h-10 rounded-full bg-green-900 cursor-pointer shadow-sm shadow-green-200 z-20"
        onClick={navigateHomepage}
      >
        <AiFillHome className="text-green-600 w-8 h-8 text-center mx-auto pt-1 my-auto" />
      </div>
    </div>
  );
};

export default HomeButton;
