import React, { useState } from "react";
import { useNavigate } from "react-router";
import { HiMenuAlt3, HiSearch } from "react-icons/hi";
import { TbUserShield, TbUserCog, TbUser } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { BsDiagram2, BsDiagram3 } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiInbox, FiPackage } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";


const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
     
        <div className="group flex items-center text-sm gap-3.5 font-medium p-2  rounded-md relative">
            <div><HiSearch /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
             <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-gray-800 text-gray-500 rounded-md p-2 focus:outline-none"
              />
            </h2>
          </div>
        
          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/dashboard")}
          >
            <div><MdOutlineDashboard /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Dashboard
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/users")}
          >
            <div><TbUserShield /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Users
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/adherents")}
          >
            <div><TbUser /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Adherents
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/categories")}
          >
            <div><BsDiagram2 /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Categories
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/subcategories")}
          >
            <div><BsDiagram3 /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Subcategories
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/services")}
          >
            <div><LiaClipboardListSolid /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Services
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/orders")}
          >
            <div><FiPackage /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Orders
            </h2>
          </button>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/reclamations")}
          >
            <div><FiInbox /></div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Reclamations
            </h2>
          </button>

         <hr/>

          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md relative"
            onClick={() => navigate("/profile")}
          >
            <div><TbUserCog /></div>
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
            onClick={() => navigate("/profile")}
          >
            <div><BiLogOut /></div>
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
