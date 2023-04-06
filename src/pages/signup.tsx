import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import Swal from "sweetalert2";

interface Inputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

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

const SignUp: React.FC = (): JSX.Element => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const user = await response.json();
      if (user._id) {
        await Toast.fire({
          icon: "success",
          title: "User Registration successful",

          iconColor: "green",
        });
      } else {
        await Toast.fire({
          icon: "error",
          title: `${user.message}`,

          iconColor: "red",
        });
      }
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center justify-center my-auto ">
      <div>
        <p className="text-5xl font-bold text-center  pb-5 text-transparent   bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 pt-10">
          Create your digital profile
        </p>
        <div className="">
          <p className="text-center">
            <span className="text-gray-200 text-center gap-2 text-xl">
              Already have an account ?{" "}
            </span>

            <Link
              to={"/login"}
              className="hover:underline text-blue-600  text-lg font-semibold"
            >
              {" "}
              please login
            </Link>
          </p>
        </div>
      </div>
      <div className="  flex justify-center items-center bg-black">
        <div
          className={` flex flex-col justify-center items-center px-4 py-10 z-[10] shadow-blue-800  shadow-lg rounded-xl bg-gray-900 w-[80%] md:w-[70%]  mx-auto mb-10 mt-20 hover:shadow-xl hover:shadow-blue-800 transition-all duration-700 ease-in backdrop-blur-md `}
        >
          <p className="text-2xl font-semibold  text-transparent   bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">
            Please Signup
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
            <div className="flex gap-3">
              <div className="pb-3 w-full">
                <label className="text-white font-bold text-sm ">
                  First Name <span className="text-red-500">*</span>{" "}
                </label>
                <br />
                <div
                  className={`flex items-center border-2 bg-gray-700  border-gray-700 rounded-md ${
                    errors.firstName
                      ? "focus-within:border-red-600"
                      : "focus-within:border-blue-700"
                  } py-1  w-full `}
                >
                  <AiOutlineUser
                    className="h-5 w-5 text-gray-400 ml-2 mr-2"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                    className={` outline-none w-full focus:border-transparent bg-gray-700 text-white font-semibold text-sm`}
                  />
                </div>
                {errors.firstName?.type === "required" && (
                  <p className="text-red-600 text-center text-sm font-light ">
                    {" "}
                    Please fillup the email Input
                  </p>
                )}
              </div>
              <div className="pb-3 w-full">
                <label className="text-white font-bold text-sm ">
                  Last Name <span className="text-red-500">*</span>{" "}
                </label>
                <br />
                <div
                  className={`flex items-center border-2 bg-gray-700  border-gray-700 rounded-md ${
                    errors.lastName
                      ? "focus-within:border-red-600"
                      : "focus-within:border-blue-700"
                  } py-1  w-full `}
                >
                  <AiOutlineUser
                    className="h-5 w-5 text-gray-400 ml-2 mr-2"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    {...register("lastName", { required: true })}
                    className={` outline-none w-full focus:border-transparent bg-gray-700 text-white font-semibold text-sm `}
                  />
                </div>
                {errors.lastName?.type === "required" && (
                  <p className="text-red-600 text-center text-sm font-light ">
                    {" "}
                    Please fillup the email Input
                  </p>
                )}
              </div>
            </div>
            <div className="pb-3 w-full">
              <label className="text-white font-bold text-sm">
                Email <span className="text-red-500">*</span>{" "}
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
                  className="h-5 w-5 text-gray-400 ml-2 mr-2"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Insert your Email"
                  {...register("email", { required: true })}
                  className={` outline-none w-full focus:border-transparent bg-gray-700 text-white font-semibold text-sm `}
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-red-600 text-center text-xs font-light ">
                  {" "}
                  Please fillup the email Input
                </p>
              )}
            </div>

            <div className="pb-3  w-full">
              <label className="text-white font-bold text-sm">
                Password <span className="text-red-500">*</span>{" "}
              </label>
              <br />
              <div
                className={` w-full flex items-center border-2 bg-gray-700 border-gray-700 rounded-md ${
                  errors.password
                    ? "focus-within:border-red-600"
                    : "focus-within:border-blue-700"
                } py-1 w-full `}
              >
                <AiOutlineLock
                  className="h-5 w-5 text-gray-400 ml-2 mr-2"
                  aria-hidden="true"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="insert minium 6 chracters"
                  {...register("password", { required: true, minLength: 6 })}
                  className={` outline-none  focus:border-transparent bg-gray-700 text-white w-full font-semibold text-sm`}
                />
                {showPass ? (
                  <RxEyeOpen
                    className="h-5 w-5 text-white cursor-pointer ml-2 mr-2"
                    aria-hidden="true"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <RxEyeClosed
                    className="h-5 w-5 text-white cursor-pointer ml-2 mr-2"
                    aria-hidden="true"
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-600 text-center text-xs font-light">
                  {" "}
                  Please fillup the Password Input
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 text-center text-xs font-light">
                  {" "}
                  Please insert atleast 6 chracters
                </p>
              )}
            </div>
            <label className=" text-center text-xs font-light">
              Forget Password?{" "}
              <Link
                to={"/resetPassword"}
                className="cursor-pointer text-indigo-700"
              >
                Reset Password
              </Link>
            </label>
            <div className="relative w-full ">
              <button
                type="submit"
                className=" w-full text-center border   hover:bg-white hover:text-black  text-white font-bold  border-black bg-black p-2  mt-5  transition-all duration-300 ease-in rounded-md"
              >
                {" "}
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
