import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { AuthContext } from "../UserContext";
import Loading from "../../pages/Loading";
import { useQuery } from "react-query";

interface BioProps {
  bio: string;
}

const Bio = () => {
  const { loading } = useContext(AuthContext);
  const email = localStorage.getItem("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BioProps>();

  const { data: bio, refetch } = useQuery(["bio"], async () => {
    const res = await fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getBio/${email}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  });
  const onSubmit: SubmitHandler<BioProps> = async (data) => {
    const updateInfo = {
      bio: data.bio,
    };
    fetch(`https://cipher-school-server-ecru.vercel.app/user/getBio/${email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full bg-black ">
      <div className="mx-[10%] bg-gray-900 px-10 py-10">
        <div className=" flex items-center justify-between my-4">
          <div>
            <p className="text-gray-300 text-lg font-semibold ">ABOUT</p>
          </div>

          <div className=" ">
            <div className=" p-2 bg-gray-800 font-semibold  text-gray-300 rounded-md flex items-center gap-1 justify-center ">
              <AiFillEdit className="w-5 h-5 text-gray-300" />
              <label htmlFor="edit-bio" className="cursor-pointer">
                {bio?.[0]?.bio ? "Edit Bio" : "Add Bio"}
              </label>
              <input type="checkbox" id="edit-bio" className="modal-toggle" />
              <div className="modal ">
                <div className="modal-box relative bg-gray-900">
                  <label
                    htmlFor="edit-bio"
                    className="btn btn-sm btn-circle  bg-black absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3>Edit Bio</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-10">
                    <input
                      type="text"
                      {...register("bio", {
                        maxLength: {
                          value: 300,
                          message: "Maximum length is 300 words",
                        },
                      })}
                      className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1 h-24 rounded-md`}
                    />
                    <div className="relative w-full ">
                      {loading ? (
                        <Loading />
                      ) : (
                        <button
                          type="submit"
                          className=" w-full text-center border text-sm  hover:bg-gray-400 hover:text-black  text-gray-300 font-bold  border-black bg-black p-2  mt-5  transition-all duration-300 ease-in rounded-md h-10"
                        >
                          {" "}
                          Update
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] w-full mr-10 bg-gray-800 rounded-md">
          <p className=" font-semibold text-gray-300 p-4">{bio?.[0]?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
