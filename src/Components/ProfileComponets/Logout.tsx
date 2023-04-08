import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type Props = {};

const Logout = (props: Props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className="fixed right-6 top-10 w-10 h-10 rounded-full bg-red-900 cursor-pointer shadow-sm shadow-white z-20"
      onClick={handleLogout}
    >
      <AiOutlineLogout className="text-red-600 w-8 h-8 text-center mx-auto pt-1 my-auto" />
    </div>
  );
};

export default Logout;
