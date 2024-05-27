import React, { useState } from "react";
import { useNavigate } from "react-router";
import SidebarData from "../data/dashboard/SidebarData"; 
import { 
  HiMenuAlt3, 
  HiSearch 
} from "react-icons/hi";
import { TbUserCog } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo2.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);



  const logout = () => {
    localStorage.removeItem("token");
    navigate("/users/login");
  };

  return (
    <section className="flex ">
      <div
        className={`bg-[#00362e] min-h-screen ${
          open ? "w-70" : "w-16"
        } duration-500 text-gray-100 px-3 py-4`}
      >
        
        <div className="py-3 flex justify-between items-center">
        {open && <img src={logo} alt="Logo" className="w-36 h-14" />}
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className=" flex flex-col gap-4 relative">
          <div className="group flex items-center text-sm gap-3.5 font-medium p-2  rounded-md relative">
            <div>
              <HiSearch />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Search"
                name="search"
                className="bg-transparent text-gray-500 rounded-md p-2 focus:outline-none"
              />
            </h2>
          </div>

          {SidebarData.map((item, index) => (
            <button
              key={index}
              className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
              onClick={() => navigate(item.path)}
            >
              <div>{item.icon}</div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {item.title}
              </h2>
            </button>
          ))}

          <hr />

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/profile")}
          >
            <div>
              <TbUserCog />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Profile
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={logout}
          >
            <div>
              <BiLogOut />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              LogOut
            </h2>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
