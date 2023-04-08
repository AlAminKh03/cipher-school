import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { AuthContext } from "../UserContext";
import Loading from "../../pages/Loading";
import { useQuery } from "react-query";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsGithub,
  BsTwitter,
  BsGlobe,
} from "react-icons/bs";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "blue",
  width: "22rem",
  background: "black",
  color: "white",
  padding: "5px",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
interface SocialProps {
  facebook: string;
  instagram: string;
  linkedIn: string;
  github: string;
  twitter: string;
  website: string;
}
interface socialProps {
  name: string;
  icon: IconType;
}

const Social = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const email = localStorage.getItem("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialProps>();

  const {
    data: socialLinks,
    refetch,
    isLoading,
  } = useQuery(["socialLinks"], async () => {
    const res = await fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getSocial/${email}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  });

  const onSubmit: SubmitHandler<SocialProps> = async (data) => {
    setLoading(true);

    const updateInfo = {
      facebook: data.facebook,
      instagram: data.instagram,
      linkedIn: data.linkedIn,
      github: data.github,
      twitter: data.twitter,
      website: data.website,
    };

    fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getSocial/${email}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateInfo),
      }
    )
      .then((res) => res.json())

      .then((data) => {
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "Media Links Added",
          iconColor: "green",
        });

        refetch();
      })

      .catch((err) => {
        setLoading(false);
        Toast.fire({
          icon: "error",
          title: `${err}`,
          iconColor: "red",
        });
        console.log(err);
      });

    console.log(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-black ">
      <div className="mx-[10%] bg-gray-900 px-10 py-10">
        <div className=" flex items-center justify-between my-4">
          <div>
            <p className="text-gray-300 text-lg font-semibold ">SOCIAL</p>
          </div>

          <div className=" ">
            <div className=" p-2 bg-gray-800 font-semibold  text-gray-300 rounded-md flex items-center gap-1 justify-center ">
              <AiFillEdit className="w-5 h-5 text-gray-300" />
              <label htmlFor="edit-social" className="cursor-pointer">
                Add Social
              </label>
              <input
                type="checkbox"
                id="edit-social"
                className="modal-toggle"
              />
              <div className="modal ">
                <div className="modal-box relative bg-gray-900">
                  <label
                    htmlFor="edit-social"
                    className="btn btn-sm btn-circle  bg-black absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3>ADD SOCIAL</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-10">
                    <div className="pb-2">
                      <label>Facebook</label>
                      <input
                        type="text"
                        defaultValue={socialLinks.facebook}
                        {...register("facebook")}
                        className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1  rounded-md`}
                      />
                    </div>
                    <div className="pb-2">
                      <label>Instagram</label>
                      <input
                        type="text"
                        defaultValue={socialLinks.instagram}
                        {...register("instagram")}
                        className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1  rounded-md`}
                      />
                    </div>
                    <div className="pb-2">
                      <label>LinkedIn</label>
                      <input
                        type="text"
                        defaultValue={socialLinks.linkedIn}
                        {...register("linkedIn", {})}
                        className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1  rounded-md`}
                      />
                    </div>
                    <div className="pb-2">
                      <label>Github</label>
                      <input
                        type="text"
                        defaultValue={socialLinks.github}
                        {...register("github", {})}
                        className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1  rounded-md`}
                      />
                    </div>
                    <div className="pb-2">
                      <label>Twitter</label>
                      <input
                        type="text"
                        defaultValue={socialLinks.twitter}
                        {...register("twitter", {})}
                        className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1  rounded-md`}
                      />
                    </div>
                    <div className="pb-2">
                      <label>Website</label>
                      <input
                        type="text"
                        defaultValue={socialLinks.website}
                        {...register("website", {})}
                        className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1  rounded-md`}
                      />
                    </div>
                    <div className="relative w-full ">
                      {loading ? (
                        <Loading />
                      ) : (
                        <button
                          type="submit"
                          className=" w-full text-center border text-sm  hover:bg-gray-400 hover:text-black  text-gray-300 font-bold  border-black bg-black p-2  mt-5  transition-all duration-300 ease-in rounded-md h-10"
                        >
                          {" "}
                          ADD
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full mr-10  rounded-md grid grid-cols-2 gap-4">
          <div
            className={`flex items-center gap-2 ${
              socialLinks?.facebook
                ? "text-gray-300 hover:underline"
                : " text-gray-700 disabled"
            }`}
          >
            <BsFacebook className=" w-7 h-7" />
            <Link to={socialLinks?.facebook} className="font-semibold">
              Facebook
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 ${
              socialLinks?.instagram
                ? "text-gray-300 hover:underline"
                : " text-gray-700 disabled"
            }`}
          >
            <BsInstagram className=" w-7 h-7" />
            <Link to={socialLinks?.instagram} className="font-semibold">
              Instagram
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 ${
              socialLinks?.linkedIn
                ? "text-gray-300 hover:underline"
                : " text-gray-700 disabled"
            }`}
          >
            <BsLinkedin className=" w-7 h-7" />
            <Link to={socialLinks?.linkedIn} className="font-semibold">
              LinkedIn
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 ${
              socialLinks?.github
                ? "text-gray-300 hover:underline"
                : " text-gray-700 disabled"
            }`}
          >
            <BsGithub className=" w-7 h-7" />
            <Link to={socialLinks?.github} className="font-semibold">
              Github
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 ${
              socialLinks?.twitter
                ? "text-gray-300 hover:underline"
                : " text-gray-700 disabled"
            }`}
          >
            <BsTwitter className=" w-7 h-7" />
            <Link to={socialLinks?.twitter} className="font-semibold">
              Twitter
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 ${
              socialLinks?.website
                ? "text-gray-300 hover:underline"
                : " text-gray-700 disabled cursor-none"
            }`}
          >
            <BsGlobe className=" w-7 h-7" />
            <Link to={socialLinks?.website} className="font-semibold">
              website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
