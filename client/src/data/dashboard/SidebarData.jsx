// SidebarData.jsx
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUserShield, TbUser } from "react-icons/tb";
import { BsDiagram2, BsDiagram3 } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiInbox, FiPackage } from "react-icons/fi";

const sidebarData = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: <TbUserShield />,
    path: "/users",
  },
  {
    title: "Adherents",
    icon: <TbUser />,
    path: "/adherents",
  },
  {
    title: "Categories",
    icon: <BsDiagram2 />,
    path: "/categories",
  },
  {
    title: "Subcategories",
    icon: <BsDiagram3 />,
    path: "/subcategories",
  },
  {
    title: "Services",
    icon: <LiaClipboardListSolid />,
    path: "/services",
  },
  {
    title: "Orders",
    icon: <FiPackage />,
    path: "/orders",
  },
  {
    title: "Reclamations",
    icon: <FiInbox />,
    path: "/reclamations",
  },
];

export default sidebarData;
