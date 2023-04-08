import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const Bio = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="mx-[10%] bg-gray-900">
      <form>
        <label htmlFor="myTextarea" className="text-bg-300 ">
          Tell Something About yourself:
        </label>
        <div
          className={`flex items-center border-2 bg-gray-700  border-gray-700 rounded-md 
                               focus-within:border-blue-700
                            } py-1  w-full `}
        >
          <input
            type="text"
            placeholder=" I am a full stack developer"
            {...register("bio", {
              maxLength: {
                value: 300,
                message: "Maximum length is 300 words",
              },
            })}
            className={`outline-none w-full focus:border-transparent bg-gray-700 text-gray-300 font-semibold text-sm placeholder:text-xs p-1`}
          />
        </div>
      </form>
    </div>
  );
};

export default Bio;
