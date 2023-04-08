import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import Swal from "sweetalert2";
import { AuthContext } from "../Components/UserContext";
import Loading from "./Loading";

interface Inputs {
  email: string;
  password: string;
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

const Login: React.FC = (): JSX.Element => {
  const { login, loading, setLoading } = useContext(AuthContext);
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    setLoading(true);
    login(userInfo);
  };
  const email = localStorage.getItem("email");
  if (email) {
    navigate("/");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center justify-center my-auto bg-black min-h-screen">
      <div>
        <p className="text-5xl font-bold text-center  pb-5 text-transparent   bg-clip-text bg-gradient-to-r from-purple-700 to-blue-800 pt-10">
          Welcome Back
        </p>
        <div className="">
          <p className="text-center">
            <span className="text-gray-200 text-center gap-2 text-xl">
              Don't have any account?{" "}
            </span>

            <Link
              to={"/signup"}
              className="hover:underline text-blue-600  text-lg font-semibold"
            >
              {" "}
              please Register
            </Link>
          </p>
        </div>
      </div>
      <div className="  flex justify-center items-center bg-black">
        <div className=" flex flex-col justify-center items-center px-4 py-10 z-[10] shadow-blue-800 shadow-lg hover:shadow-blue-800 hover:shadow-xl rounded-xl bg-gray-900 w-[80%] md:w-[70%]  mx-auto mb-10 mt-20 transition-all duration-700 ease-in">
          <p className="text-2xl font-semibold  text-transparent   bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">
            Please Login
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
            <div className="pb-3 w-full">
              <label className="text-gray-300  text-xs font-bold">
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
                  className="h-4 w-4 text-gray-400 ml-2 mr-2"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Insert your Email"
                  {...register("email", { required: true })}
                  className={` outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 autofill:bg-gray-700 font-semibold text-sm placeholder:text-xs p-1`}
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
              <label className="text-gray-300 font-bold text-xs">
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
                  className="h-4 w-4 text-gray-400 ml-2 mr-2"
                  aria-hidden="true"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="insert your password"
                  {...register("password", { required: true })}
                  className={` outline-none  focus:border-transparent bg-gray-700 text-gray-300 w-full font-semibold text-sm placeholder:text-xs p-1`}
                />
                {showPass ? (
                  <RxEyeOpen
                    className="h-6 w-6 text-gray-300 cursor-pointer ml-2 mr-2"
                    aria-hidden="true"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <RxEyeClosed
                    className="h-6 w-6 text-gray-300 cursor-pointer ml-2 mr-2"
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
            </div>
            {/* <label className=" text-center text-xs font-light">
              Forget Password?{" "}
              <Link
                to={"/resetPassword"}
                className="cursor-pointer text-indigo-700"
              >
                Reset Password
              </Link>
            </label> */}
            <div className="relative w-full ">
              {loading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className=" w-full text-center border text-sm  hover:bg-gray-400 hover:text-black  text-gray-300 font-bold  border-black bg-black p-2  mt-5  transition-all duration-300 ease-in rounded-md"
                >
                  {" "}
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
