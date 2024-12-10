import { useState } from "react";
import { FaChevronUp, FaChevronDown,FaPlus } from "react-icons/fa";


export const SingleLevelDropdownMenu = ({ buttonLabel, items }) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center w-12 justify-center rounded-lg sticky  bg-gray-400 text-md border opacity-80 border-[#e4e4e7] h-8 px-4 py-2"
        onClick={handleToggle}
      >
        {buttonLabel}
        <span className="">
          {open ? <FaChevronUp /> : <FaPlus />}
        </span>
      </button>
      {open && (
        <div className="absolute ml-28  -translate-x-1/2 top-10">
          <ul className="w-56 h-auto shadow-md bg-gray-300 backdrop-blur-lg opacity-80 rounded-md p-1">
            {items.map((item, index) => (
              <li
                key={index}
                className="relative flex items-center gap-2 px-4 py-2 text-md font-serif hover:bg-gray-400 rounded-md"
                onClick={item.action}
              >
                {item.icon}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
