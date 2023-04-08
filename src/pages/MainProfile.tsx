import React from "react";
import Profile from "../Components/ProfileComponets/Profile";
import Bio from "../Components/ProfileComponets/Bio";

type Props = {};

const MainProfile = (props: Props) => {
  return (
    <div className="min-h-screen bg-black">
      <Profile />
      <Bio />
    </div>
  );
};

export default MainProfile;
