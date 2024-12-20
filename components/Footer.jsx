import { FaHeart } from "react-icons/fa6";
import "../src/tailwind.css";

// This footer is used to mark my name in the App
function Footer() {
  return (
    <div
      className="bg-transparent text-sm min-w-full p-1
    flex flex-row items-center justify-center gap-2"
    >
      <p className="text-neutral-800 font-semibold">Made with </p>
      <p className="text-red-700"><FaHeart /></p>
      <p className="text-neutral-800 font-semibold"> by Prithvish Sarkar</p>
    </div>
  );
}

export { Footer };