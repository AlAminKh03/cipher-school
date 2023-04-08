import React, { useContext, useEffect, useState } from "react";
import bg from "../../assets/profile/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEdit,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { AuthContext } from "../UserContext";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import Loading from "../../pages/Loading";
import { useQuery } from "react-query";
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

interface Inputs {
  email: string;
  image: string;
  firstName: string;
  lastName: string;
}
interface UserProps {
  email: string;
  img: string;
  firstName: string;
  lastName: string;
}

const Profile = () => {
  const { signUp, loading, setLoading } = useContext(AuthContext);
  // const [user, setUser] = useState<UserProps>();
  const email = localStorage.getItem("email");
  const imagebbkey = "57ee535d1e0e0bdddbe43da2b7d8e612";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery(["user"], async () => {
    const res = await fetch(`http://localhost:8000/user/getUser/${email}`);
    const data = await res.json();
    console.log(data);

    return data;
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(user);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    if (data.image.length === 0) {
      const updateInfo = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      return await fetch(`http://localhost:8000/user/getUser/${email}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          Toast.fire({
            icon: "success",
            title: "Updated successfully",
            iconColor: "green",
          });
          console.log(data);
          refetch();
        });
    }

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imagebbkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const updateInfo = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            img: imageData.data.url,
          };
          fetch(`http://localhost:8000/user/getUser/${email}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              Toast.fire({
                icon: "success",
                title: "Updated Successfylly",
                iconColor: "green",
              });
              refetch();
              console.log(data);
            });
        }
      });
  };

  return (
    <div className="bg-black  w-full">
      <div className="mx-[10%] bg-gray-900 ">
        <div className="relative">
          <img src={bg} className="h-[150px] object-cover  w-full " />
          <div className="absolute top-[80%] lg:left-[3%]  z-10 flex  justify-center flex-col lg:flex-row lg:justify-between items-center w-full">
            <div className="flex flex-col lg:flex-row items-center gap-5 mb-4">
              {user && (
                <img
                  src={user.img}
                  className="h-[150px] w-[150px] object-cover rounded-full border-[5px] border-blue-600  "
                />
              )}
              <div className="flex flex-col items-center justify-center lg:items-start">
                <p className="font-bold text-gray-300 text-4xl">
                  {user?.firstName} {user?.lastName}
                </p>
                <Link
                  to="/followers"
                  className=" font-bold text-lg cursor-pointer text-gray-400 hover:underline"
                >
                  20 Followers{" "}
                </Link>
              </div>
            </div>

            <div className="lg:mr-20 mr-0">
              <div className=" p-2 bg-gray-800 font-semibold  text-gray-300 rounded-md flex items-center gap-1 justify-center">
                <AiFillEdit className="w-5 h-5 text-gray-300" />
                <label htmlFor="edit-profile" className="cursor-pointer">
                  Edit Profile
                </label>
                <input
                  type="checkbox"
                  id="edit-profile"
                  className="modal-toggle"
                />
                <div className="modal ">
                  <div className="modal-box relative bg-gray-900">
                    <label
                      htmlFor="edit-profile"
                      className="btn btn-sm btn-circle  bg-black absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <h3>Edit Profile</h3>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-full p-4 "
                    >
                      <div className="flex justify-evenly items-center mb-10">
                        {user && (
                          <img
                            src={user.img}
                            className="h-[150px] w-[150px] object-cover rounded-full border-[5px] border-blue-600  "
                          />
                        )}
                        <div className=" ">
                          <input type="file" {...register("image")} />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="pb-3 w-full">
                          <label className="text-gray-300 font-bold text-xs text-left">
                            First Name
                          </label>
                          <br />
                          <div
                            className={`flex items-center border-2 bg-gray-700  border-gray-700 rounded-md 
                               focus-within:border-blue-700
                            } py-1  w-full `}
                          >
                            <AiOutlineUser
                              className="h-4 w-4 text-gray-400 ml-2 mr-2"
                              aria-hidden="true"
                            />
                            <input
                              type="text"
                              defaultValue={user?.firstName}
                              placeholder="First Name"
                              {...register("firstName")}
                              className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1`}
                            />
                          </div>
                        </div>
                        <div className="pb-3 w-full">
                          <label className="text-gray-300  font-bold text-xs ">
                            Last Name
                          </label>
                          <br />
                          <div
                            className={`flex items-center border-2 bg-gray-700  border-gray-700 rounded-md 
                                focus-within:border-blue-700
                            } py-1  w-full `}
                          >
                            <AiOutlineUser
                              className="h-4 w-4 text-gray-400 ml-2 mr-2"
                              aria-hidden="true"
                            />
                            <input
                              type="text"
                              defaultValue={user?.lastName}
                              placeholder="Last name"
                              {...register("lastName")}
                              className={` outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="pb-3 w-full">
                        <label className="text-gray-300  font-bold text-xs">
                          Email
                        </label>
                        <br />
                        <div
                          className={`flex items-center border-2 bg-gray-700  border-gray-700 rounded-md ${
                            errors.email
                              ? "focus-within:border-red-600"
                              : "focus-within:border-blue-700"
                          } py-1  w-full `}
                        >
                          <AiOutlineMail
                            className="h-4 w-4 text-gray-400 ml-2 mr-2"
                            aria-hidden="true"
                          />
                          <input
                            type="text"
                            value={user?.email || " "}
                            placeholder="Insert your Email"
                            {...register("email")}
                            className={` outline-none w-full focus:border-transparent bg-gray-700 text-gray-400 text-sm placeholder:text-xs font-semibold p-1`}
                          />
                        </div>
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
        </div>
        <hr className="border-gray-600 lg:mt-36 mt-[18rem] w-full " />
      </div>
    </div>
  );
};

export default Profile;
