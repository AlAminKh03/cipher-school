import React, { useEffect, useContext } from "react";
import { AuthContext } from "../UserContext";
import { useNavigate, Outlet } from "react-router-dom";

type Props = {};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useContext(AuthContext);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate(`/login`);
    }
  }, [email]);
  if (email) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  console.log(email);

  if (loading) {
    return (
      <div className="bg-black text-gray-300 min-h-screen">Loading....</div>
    );
  }

  return null;
};

export default PrivateRoute;
