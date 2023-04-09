import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { AuthContext } from "../UserContext";
import Loading from "../../pages/Loading";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
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
interface PassProps {
  currentPass: string;
  newPass: string;
}

const ChangePass = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { loading } = useContext(AuthContext);
  const email = localStorage.getItem("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassProps>();

  const onSubmit: SubmitHandler<PassProps> = async (data) => {
    const updateInfo = {
      currentPass: data.currentPass,
      newPass: data.newPass,
    };

    fetch(
      `https://cipher-school-server-ecru.vercel.app/user/changePass/${email}`,
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
        if (data.success) {
          Toast.fire({
            icon: "success",
            title: `${data.success}`,
            iconColor: "green",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: `${data.failed}`,
            iconColor: "red",
          });
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  return (
    <div className="w-full bg-black ">
      <div className="mx-[10%] bg-gray-900 px-10 py-10">
        <div className=" flex items-center justify-center my-4">
          <div className=" p-2 bg-red-800 hover:bg-red-700 font-semibold  text-gray-300 rounded-md flex items-center gap-1 justify-center ">
            <AiFillEdit className="w-5 h-5 text-gray-300" />
            <label htmlFor="edit-pass" className="cursor-pointer">
              Change Password
            </label>
            <input type="checkbox" id="edit-pass" className="modal-toggle" />
            <div className="modal ">
              <div className="modal-box relative bg-gray-900">
                <label
                  htmlFor="edit-pass"
                  className="btn btn-sm btn-circle  bg-black absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3>TECH SELECT</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 ">
                  <div className="pb-3 w-full">
                    <label className="text-gray-300  text-xs font-bold">
                      Current Password <span className="text-red-500">*</span>{" "}
                    </label>
                    <br />
                    <div
                      className={` w-full flex items-center border-2 bg-gray-700 border-gray-700 rounded-md ${
                        errors.currentPass
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
                        placeholder="insert your current password"
                        {...register("currentPass", { required: true })}
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
                    {errors.currentPass?.type === "required" && (
                      <p className="text-red-600 text-center text-xs font-light ">
                        {" "}
                        Please fillup the your current Input
                      </p>
                    )}
                  </div>

                  <div className="pb-3  w-full">
                    <label className="text-gray-300 font-bold text-xs">
                      New Password <span className="text-red-500">*</span>{" "}
                    </label>
                    <br />
                    <div
                      className={` w-full flex items-center border-2 bg-gray-700 border-gray-700 rounded-md ${
                        errors.newPass
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
                        {...register("newPass", { required: true })}
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
                    {errors.newPass?.type === "required" && (
                      <p className="text-red-600 text-center text-xs font-light">
                        {" "}
                        Please fillup the new password
                      </p>
                    )}
                  </div>

                  <div className="relative w-full ">
                    {loading ? (
                      <Loading />
                    ) : (
                      <button
                        type="submit"
                        className=" w-full text-center border text-sm  hover:bg-gray-400 hover:text-black  text-gray-300 font-bold  border-black bg-black p-2  mt-5  transition-all duration-300 ease-in rounded-md"
                      >
                        {" "}
                        Change Password
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
  );
};

export default ChangePass;
