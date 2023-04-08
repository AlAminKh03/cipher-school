import React from "react";
import Profile from "../Components/ProfileComponets/Profile";
import Bio from "../Components/ProfileComponets/Bio";
import Social from "../Components/ProfileComponets/Social";
import Infromation from "../Components/ProfileComponets/Information";
import Interests from "../Components/ProfileComponets/Interests";
import ChangePass from "../Components/ProfileComponets/ChangePass";

type Props = {};

const MainProfile = (props: Props) => {
  return (
    <div className="min-h-screen bg-black ">
      <Profile />
      <Bio />
      <Social />
      <Infromation />
      <Interests />
      <ChangePass />
    </div>
  );
};

export default MainProfile;
