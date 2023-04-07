import Lottie from "lottie-react";
import loading from "../assets/Loading.json";

type Props = {};

const Loading = (props: Props) => {
  return (
    <button className=" w-full text-center border text-sm font-bold  border-black bg-black mt-5  rounded-md h-10">
      <Lottie animationData={loading} className="w-10 h-10 mx-auto" />
    </button>
  );
};

export default Loading;
