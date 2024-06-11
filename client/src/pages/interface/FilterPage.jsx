import React, { useState } from 'react';

// Sample data
const data = [
  { id: 1, category: 'Electronics', subcategory: 'Mobile', price: 200, status: 'new' },
  { id: 2, category: 'Electronics', subcategory: 'Laptop', price: 1000, status: 'old' },
  { id: 3, category: 'Clothing', subcategory: 'Men', price: 50, status: 'new' },
  { id: 4, category: 'Clothing', subcategory: 'Women', price: 70, status: 'old' },
  // Add more data as needed
];

const categories = {
  Electronics: ['Mobile', 'Laptop'],
  Clothing: ['Men', 'Women'],
  // Add more categories and subcategories as needed
};

const FilterPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [status, setStatus] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange([+e.target.value[0], +e.target.value[1]]);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      (selectedCategory ? item.category === selectedCategory : true) &&
      (selectedSubcategory ? item.subcategory === selectedSubcategory : true) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1] &&
      (status ? item.status === status : true)
    );
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded w-full"
        >
          <option value="">All</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="mb-4">
          <label className="block mb-2">Subcategory</label>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            className="p-2 border rounded w-full"
          >
            <option value="">All</option>
            {categories[selectedCategory].map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={(e) => setPriceRange([0, +e.target.value])}
          className="w-full"
        />
        <div className="flex justify-between">
          <span>0</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="p-2 border rounded w-full"
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="old">Old</option>
        </select>
      </div>

      <div>
        <h2 className="text-xl mb-4">Filtered Results</h2>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="p-4 border mb-2 rounded">
              <h3 className="font-bold">{item.category}</h3>
              <p>{item.subcategory}</p>
              <p>${item.price}</p>
              <p>{item.status}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
