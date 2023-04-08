import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { AuthContext } from "../UserContext";
import Loading from "../../pages/Loading";
import { useQuery } from "react-query";

interface TechProps {
  javascript: string;
  python: string;
  react: string;
  anguler: string;
  vue: string;
  typescript: string;
}

const Interests = () => {
  const { loading } = useContext(AuthContext);
  const email = localStorage.getItem("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TechProps>();

  const {
    data: techs,
    refetch,
    isLoading,
  } = useQuery(["techs"], async () => {
    const res = await fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getTech/${email}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  });
  const onSubmit: SubmitHandler<TechProps> = async (data) => {
    const updateInfo = {
      react: data.react,
      anguler: data.anguler,
      vue: data.vue,
      javascript: data.javascript,
      typescript: data.typescript,
      python: data.python,
    };

    fetch(
      `https://cipher-school-server-ecru.vercel.app/user/getTech/${email}`,
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
        console.log(data);
        refetch();
      })
      .catch((err) => {
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
              INTEREST IN TECH
            </p>
          </div>

          <div className=" ">
            <div className=" p-2 bg-gray-800 font-semibold  text-gray-300 rounded-md flex items-center gap-1 justify-center ">
              <AiFillEdit className="w-5 h-5 text-gray-300" />
              <label htmlFor="edit-interest" className="cursor-pointer">
                Edit Preference
              </label>
              <input
                type="checkbox"
                id="edit-interest"
                className="modal-toggle"
              />
              <div className="modal ">
                <div className="modal-box relative bg-gray-900">
                  <label
                    htmlFor="edit-interest"
                    className="btn btn-sm btn-circle  bg-black absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3>TECH SELECT</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                      <label className="inline-flex items-center mt-3 text-gray-300">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 text-blue-500"
                          {...register("react")}
                        />
                        <span className="ml-2  text-gray-300">React</span>
                      </label>
                      <label className="inline-flex items-center mt-3 text-gray-300">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 text-blue-500"
                          {...register("anguler")}
                        />
                        <span className="ml-2  text-gray-300">Anguler</span>
                      </label>
                      <label className="inline-flex items-center mt-3 text-gray-300">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 text-blue-500"
                          {...register("vue")}
                        />
                        <span className="ml-2  text-gray-300">Vue</span>
                      </label>
                      <label className="inline-flex items-center mt-3 text-gray-300">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 text-blue-500"
                          {...register("javascript")}
                        />
                        <span className="ml-2  text-gray-300">JavaScript</span>
                      </label>
                      <label className="inline-flex items-center mt-3 text-gray-300">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 text-blue-500"
                          {...register("typescript")}
                        />
                        <span className="ml-2  text-gray-300">Typescript</span>
                      </label>
                      <label className="inline-flex items-center mt-3 text-gray-300">
                        <input
                          type="checkbox"
                          className=" h-5 w-5 text-blue-500"
                          {...register("python")}
                        />
                        <span className="ml-2  text-gray-300">Python</span>
                      </label>
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
        <div className=" w-full mr-10 gap-2 flex flex-wrap ">
          <span
            className={` bg-blue-800 text-gray-300 font-bold p-1 rounded-md m-3 w-fit ${
              techs?.react ? "block" : "hidden"
            }`}
          >
            {" "}
            React
          </span>
          <span
            className={` bg-blue-800 text-gray-300 font-bold p-1 rounded-md m-3 w-fit ${
              techs?.python ? "block" : "hidden"
            }`}
          >
            {" "}
            Python
          </span>
          <span
            className={` bg-blue-800 text-gray-300 font-bold p-1 rounded-md m-3 w-fit ${
              techs?.anguler ? "block" : "hidden"
            }`}
          >
            {" "}
            Anguler
          </span>
          <span
            className={` bg-blue-800 text-gray-300 font-bold p-1 rounded-md m-3 w-fit ${
              techs?.javascript ? "block" : "hidden"
            }`}
          >
            {" "}
            Javascript
          </span>
          <span
            className={` bg-blue-800 text-gray-300 font-bold p-1 rounded-md m-3 w-fit ${
              techs?.typescript ? "block" : "hidden"
            }`}
          >
            {" "}
            Typescript
          </span>
          <span
            className={` bg-blue-800 text-gray-300 font-bold p-1 rounded-md m-3 w-fit ${
              techs?.vue ? "block" : "hidden"
            } `}
          >
            {" "}
            Vue
          </span>
        </div>
      </div>
    </div>
  );
};

export default Interests;
