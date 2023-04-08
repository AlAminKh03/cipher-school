import React from "react";
import { useState, useEffect } from "react";

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
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-12 mx-[100px] py-[20px]">
        {followers.map((follower: FollowerPeops) => {
          return (
            <div className="bg-gray-900 p-6 rounded-md">
              <div key={follower._id}>
                <img
                  src={follower.photoUrl}
                  alt="follower image "
                  className="w-[150px] h-[150px] rounded-full"
                />
                <p className="text-gray-300 font-semibold">{follower.name}</p>
                <p className="text-gray-300 font-semibold">
                  Status: {follower.status}
                </p>
                <p className="text-gray-300 font-semibold">
                  {" "}
                  {follower.follower} Followers
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
              ? "bg-gray-300 cursor-default"
              : "bg-gray-500 hover:bg-gray-600"
          } px-4 py-2 rounded-md`}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          {currentPage - 1 <= 0 ? "1" : currentPage - 1}
        </button>

        <button
          className={`ml-2 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-default"
              : "bg-gray-500 hover:bg-gray-600"
          } px-4 py-2 rounded-md`}
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
