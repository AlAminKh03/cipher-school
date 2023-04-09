import React from "react";
import { useState, useEffect } from "react";
import HomeButton from "../Components/ProfileComponets/HomeButton";
import Logout from "../Components/ProfileComponets/Logout";

interface FollowerPeops {
  _id: string;
  name: string;
  status: string;
  photoUrl: string;
  follower: number;
}

const MyFollower = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [followers, setFollowers] = useState<FollowerPeops[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await fetch(
        `https://cipher-school-server-ecru.vercel.app/followers?page=${currentPage}`
      );
      const data = await response.json();
      console.log(data.followers);
      setFollowers(data.followers);
      setTotalPages(data.totalPages);
    };

    fetchFollowers();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="bg-black min-h-screen ">
      <HomeButton />
      <Logout />
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-16 gap-8 mx-[100px] py-[20px]">
        {followers.map((follower: FollowerPeops) => {
          return (
            <div className="bg-gray-900 p-6 rounded-md">
              <div key={follower._id}>
                <div className="flex justify-between my-2">
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={follower.photoUrl}
                        alt="follower image "
                        className="w-[50px] h-[50px] rounded-full border-2 object-cover border-blue-400 "
                      />
                    </div>
                    <div>
                      <p className="text-gray-200 font-semibold text-lg">
                        {follower.name}
                      </p>
                      <p className="text-gray-500  text-sm">
                        {" "}
                        @{follower.name}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="py-1 px-4 bg-blue-500 rounded-2xl text-gray-200 font-semibold">
                      Follow
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 font-semibold">{follower.status}</p>
                <p className="text-gray-400 text-sm">
                  <span className="font-bold">{follower.follower}</span>{" "}
                  Followers{" "}
                  <span className="px-2">
                    {" "}
                    <span className="font-bold">13</span> Following 🚀
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center py-14">
        <button
          className={`mr-2 ${
            currentPage === 1
              ? "bg-blue-600 cursor-default"
              : "bg-gray-500 hover:bg-blue-600"
          } px-4 py-2 rounded-md text-white font-semibold`}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          {currentPage - 1 <= 0 ? "1" : currentPage - 1}
        </button>

        <button
          className={`ml-2 ${
            currentPage === totalPages
              ? "bg-blue-600 cursor-default"
              : "bg-gray-500 hover:bg-blue-600"
          } px-4 py-2 rounded-md text-white font-semibold`}
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          {totalPages}
        </button>
      </div>
    </div>
  );
};

export default MyFollower;
