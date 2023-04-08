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

const Infromation = () => {
  const { loading } = useContext(AuthContext);
  const email = localStorage.getItem("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialProps>();

  const socials: socialProps[] = [
    {
      name: "Facebook",
      icon: BsFacebook,
    },
    {
      name: "Instgram",
      icon: BsInstagram,
    },
    {
      name: "LinkedIn",
      icon: BsLinkedin,
    },
    {
      name: "Github",
      icon: BsGithub,
    },
    {
      name: "Twitter",
      icon: BsTwitter,
    },
    {
      name: "Website",
      icon: BsGlobe,
    },
  ];

  const { data: socialLinks, refetch } = useQuery(["socialLinks"], async () => {
    const res = await fetch(`http://localhost:8000/user/getSocial/${email}`);
    const data = await res.json();
    console.log(data);
    return data;
  });
  const onSubmit: SubmitHandler<SocialProps> = async (data) => {
    const updateInfo = {
      facebook: data.facebook,
      instagram: data.instagram,
      linkedIn: data.linkedIn,
      github: data.github,
      twitter: data.twitter,
      website: data.website,
    };

    fetch(`http://localhost:8000/user/getSocial/${email}`, {
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
    console.log(data);
  };
  return (
    <div className="w-full bg-black ">
      <div className="mx-[10%] bg-gray-900 px-10 py-10">
        <div className=" flex items-center justify-between my-4">
          <div>
            <p className="text-gray-300 text-lg font-semibold ">
              {" "}
              INSTITUTIONAL INFORMATION
            </p>
          </div>

          <div className=" ">
            <div className=" p-2 bg-gray-800 font-semibold  text-gray-300 rounded-md flex items-center gap-1 justify-center ">
              <AiFillEdit className="w-5 h-5 text-gray-300" />
              <label htmlFor="edit-infromation" className="cursor-pointer">
                Edit Info
              </label>
              <input
                type="checkbox"
                id="edit-infromation"
                className="modal-toggle"
              />
              <div className="modal ">
                <div className="modal-box relative bg-gray-900">
                  <label
                    htmlFor="edit-infromation"
                    className="btn btn-sm btn-circle  bg-black absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3>INSTITUTIONAL INFORMATION</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label>Highest education</label>
                      <select {...register("education")}>
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="higher secondary">
                          Higher Secondary
                        </option>
                        <option value="graduating">Graduating</option>
                      </select>
                    </div>
                    <div>
                      <label>Current education</label>
                      <select {...register("profession")}>
                        <option value="primary">Job</option>
                        <option value="secondary">studying</option>
                        <option value="higher secondary">Teaching</option>
                        <option value="graduating">Freelancing</option>
                      </select>
                    </div>
                  </form>
                  .
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

export default Infromation;
