import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { AuthContext } from "../UserContext";
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
interface InfoProps {
  education: string;
  profession: string;
}

const Infromation = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const email = localStorage.getItem("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoProps>();

  const {
    data: Infos,
    refetch,
    isLoading,
  } = useQuery(["Infos"], async () => {
    const res = await fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getInfo/${email}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  });
  const onSubmit: SubmitHandler<InfoProps> = async (data) => {
    setLoading(true);
    const updateInfo = {
      education: data.education,
      profession: data.profession,
    };

    fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getInfo/${email}`,
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
        console.log(data);
        refetch();
      })
      .catch((err) => {
        setLoading(false);
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
                    <div className="p-8">
                      <label className="p-2">Highest education</label>
                      <select
                        {...register("education")}
                        className="bg-gray-800 h-14 border-blue-600 rounded-md p-3"
                      >
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Higher Secondary">
                          Higher Secondary
                        </option>
                        <option value="Graduating">Graduating</option>
                      </select>
                    </div>
                    <div className="p-8">
                      <label className="p-2">Current education</label>
                      <select
                        {...register("profession")}
                        className="bg-gray-800 h-14 border-blue-600 rounded-md p-3"
                      >
                        <option value="Job">Job</option>
                        <option value="Studying">studying</option>
                        <option value="Teaching">Teaching</option>
                        <option value="Freelancing">Freelancing</option>
                      </select>
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
        <div className=" w-full mr-10  rounded-md grid-cols-1 grid lg:grid-cols-2 gap-4">
          <div className="">
            <p className="text-gray-300 text-lg font-semibold bg-gray-800 p-2">
              Highest Education
            </p>
            <p className="bg-gray-700 text-lg p-2 border-2 border-blue-800 rounded-md text-gray-300 font-bold text-center">
              {Infos?.education}
            </p>
          </div>
          <div>
            <p className="text-gray-300 text-lg font-semibold bg-gray-800 p-2">
              {" "}
              Current Job
            </p>
            <p className="bg-gray-700 text-lg p-2 border-2 border-blue-800  rounded-md text-gray-300 font-bold text-center">
              {Infos?.profession}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infromation;
