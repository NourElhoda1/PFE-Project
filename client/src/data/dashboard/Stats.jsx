import React from 'react';
import { TbUser } from "react-icons/tb";
import { BsDiagram2, BsDiagram3 } from "react-icons/bs";

const Stats = [

  {
    title: "Today's Adherents",
    amount: "2,300",
    change: "+3%",
    changeType: "positive",
    icon: <TbUser size={27}/>,
    path : "/adherents"
  },

  {
    title: "Categories",
    amount: "2",
    icon: <BsDiagram2 size={27}/>,
    path: "/categories",
  },

  {
    title: "Subcategories",
    amount: "2",
    icon: <BsDiagram3 size={27}/>,
    path: "/subcategories",
  },

  {
    title: "Services",
    amount: "+3,462",
    change: "+2%",
    changeType: "positive",
    icon: <TbUser size={27}/>,
    path : "/services"
  },

  {
    title: "Orders",
    amount: "+3,462",
    change: "+2%",
    changeType: "positive",
    icon: <TbUser size={27}/>,
    path : "/orders"
  },
];

export default Stats;
