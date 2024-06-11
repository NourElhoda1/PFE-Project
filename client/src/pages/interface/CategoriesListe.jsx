import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, categoriesSelector } from '../../app/categorySlice';
import { getAllSubcategories, subcategoriesSelector } from '../../app/subcategorySlice';
import { getAllServices, servicesSelector } from '../../app/serviceSlice';
import AuthAxios from '../../helpers/request';
import Navbar from '../../layout/Navbar/Navbar';
import Footer from '../../layout/Footer/Footer';
import { IoSearch } from "react-icons/io5";
import { useParams } from 'react-router';

const App = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const subcategories = useSelector(subcategoriesSelector);
  const services = useSelector(servicesSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId || '')
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]); // Updated for multiple selection
  const [searchKeyword, setSearchKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState(''); // State to manage sorting

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await AuthAxios.get(`/v1/services?page=${currentPage}`);
        dispatch(getAllServices(response.data.docs));
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AuthAxios.get('/v1/categories');
        dispatch(getAllCategories(response.data.docs));
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await AuthAxios.get('/v1/subcategories');
        dispatch(getAllSubcategories(response.data.docs));
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
      setSelectedSubcategoryIds([]);
    }
  }, [categoryId]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(prevCategoryId => prevCategoryId === categoryId ? '' : categoryId);
    setSelectedSubcategoryIds([]);
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategoryIds(prevSubcategoryIds => {
      if (prevSubcategoryIds.includes(subcategoryId)) {
        return prevSubcategoryIds.filter(id => id !== subcategoryId);
      } else {
        return [...prevSubcategoryIds, subcategoryId];
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filterServices = (services, searchKeyword, minPrice, maxPrice) => {
    return services.filter(service => {
      const price = parseFloat(service.price);
      const matchesPrice = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
      const matchesKeyword = !searchKeyword || service.service_name.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchesPrice && matchesKeyword;
    });
  };

  const sortServices = (services, sortOption) => {
    if (sortOption === 'highToLow') {
      return services.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === 'lowToHigh') {
      return services.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === 'newest') {
      return services.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === 'oldest') {
      return services.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return services;
  };

  const filteredServices = useMemo(() => {
    let result = services;

    if (selectedCategoryId) {
      result = result.filter(service => service.category_name === categories.find(cat => cat.id === selectedCategoryId)?.category_name);
    }

    if (selectedSubcategoryIds.length > 0) {
      result = result.filter(service => selectedSubcategoryIds.includes(subcategories.find(sub => sub.subcategory_name === service.subcategory_name)?.id));
    }

    result = filterServices(result, searchKeyword, minPrice, maxPrice);
    result = sortServices(result, sortOption);

    return result;
  }, [services, selectedCategoryId, selectedSubcategoryIds, categories, subcategories, searchKeyword, minPrice, maxPrice, sortOption]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto pt-4 mb-10">
        <div className="flex gap-4 p-4 mb-12 w-[50%] bg-transparent border border-gray-500 outline-dark rounded-full">
          <IoSearch size={30} />
          <input
            type="text"
            placeholder="Search services..."
            onChange={handleSearchChange}
            className='w-1/2 bg-transparent border-none outline-none'
          />
        </div>
        <div className="flex flex-col lg:flex-row mt-4  gap-6">
            <Sidebar
            categories={categories}
            subcategories={subcategories}
            isLoading={isLoading}
            selectedCategoryId={selectedCategoryId}
            selectedSubcategoryIds={selectedSubcategoryIds} // Updated for multiple selection
            handleCategoryChange={handleCategoryChange}
            handleSubcategoryChange={handleSubcategoryChange}
            handleSearchChange={handleSearchChange}
            setSearchKeyword={setSearchKeyword}
            minPrice={minPrice}
            maxPrice={maxPrice}
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
            handleSortChange={handleSortChange}
            sortOption={sortOption}
          />
          <div >
            <div className="flex flex-row-reverse  mb-6 mt-4 ">
            <select
              name="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border border-gray-400 w-[14rem] px-4 py-2 bg-transparent rounded-lg"
            >
              <option value="" disabled>Sort By</option>
            <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
            </select>
          </div>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Sidebar = ({
  categories,
  subcategories,
  isLoading,
  selectedCategoryId,
  selectedSubcategoryIds,
  handleCategoryChange,
  handleSubcategoryChange,
  handleSearchChange,
  setSearchKeyword,
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleSortChange,
  sortOption
}) => {
  const filteredSubcategories = useMemo(() => {
    if (!selectedCategoryId) return [];
    return subcategories.filter(sub => sub.category_name === categories.find(cat => cat.id === selectedCategoryId)?.category_name);
  }, [subcategories, selectedCategoryId, categories]);

  return (
    <aside className="w-full lg:w-1/4 mb-4 lg:mb-0 lg:mr-4">
      <h2 className="font-bold text-xl mb-4 mt-2">Category</h2>
      <div className="flex flex-col mb-4">
        {categories.map(category => (
          <label key={category.id} className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="mr-2"
              value={category.id}
              checked={selectedCategoryId === category.id}
              onChange={() => handleCategoryChange(category.id)}
            />
            {category.category_name}
          </label>
        ))}
      </div>
      {filteredSubcategories.length > 0 && (
        <>
          <hr className="mb-4 border-gray-400 mb-6 mt-6" />
          <h2 className="font-bold mb-2">Subcategory</h2>
          <div className="flex flex-col mb-4">
            {filteredSubcategories.map(subcategory => (
              <label key={subcategory.id} className="inline-flex items-center mb-2">
                <input
                  type="checkbox" // Changed to checkbox for multiple selection
                  className="mr-2"
                  value={subcategory.id}
                  checked={selectedSubcategoryIds.includes(subcategory.id)}
                  onChange={() => handleSubcategoryChange(subcategory.id)}
                />
                {subcategory.subcategory_name}
              </label>
            ))}
          </div>
        </>
      )}
      <hr className="mb-4 border-gray-400 mb-6 mt-6" />
      <div className="flex flex-col mb-4">
        <h2 className="font-bold mb- text-xl">Price Range</h2>
        <div className="flex">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border border-gray-400 px-4 py-2 w-[6rem] rounded-full  mr-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border border-gray-400 px-4 py-2 w-[6rem] rounded-full "
          />
        </div>
      </div>


      {isLoading && <p>Loading...</p>}
    </aside>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between md:h-80">
      <div>
        <div className="flex items-center mb-2">
          <img src={service.profile_image} alt={service.service_name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="font-bold text-xl">{service.service_name}</h2>
            <h3 className="text-gray-600">{service.first_name} {service.last_name}</h3>
          </div>
        </div>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Price:</span> {service.price}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Category:</span> {service.category_name}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Subcategory:</span> {service.subcategory_name}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Short Description:</span> {service.short_description}</p>
        {service.service_image && (
          <img src={service.service_image} alt={service.service_name} className="rounded max-h-20 object-cover w-full mt-2 md:max-h-full md:object-contain" />
        )}
        <div className="mt-2">
          {service.tags && service.tags.map((tag, index) => (
            <span key={index} className="text-sm bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 inline-block">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-gray-600 hover:text-gray-800"><i className="far fa-heart"></i></button>
        <a href={`/services/detail/${service.id}`} className="bg-green-500 text-white px-4 py-2 rounded">See Service</a>
      </div>
    </div>
  );
};

export default App;
