// src/CategoryCard.js
import React from 'react';

const CategoryCard = ({ title}) => {
  return (
    <div className="rounded-lg p-6 text-center  border border-transparent hover:border-[#c6c6c6]  hover:bg-[#c6c6c6] transition duration-300 ease-in-out">
      <h3 className="text-2xl  mb-2">{title}</h3>
    </div>
  );
};

export default CategoryCard;
