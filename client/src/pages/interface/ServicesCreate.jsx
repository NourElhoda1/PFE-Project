/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { addService } from "../../app/serviceSlice";
import AuthAxios from "../../helpers/request";
import { getAllCategories, categoriesSelector } from "../../app/categorySlice";
import {
  getAllSubcategories,
  subcategoriesSelector,
} from "../../app/subcategorySlice";

const CreateService = () => {
  const [serviceData, setServiceData] = useState({
    sellerId: "",
    service_name: "",
    categoryId: "",
    subcategoryId: "",
    images: null,
    price: "",
    short_description: "",
    long_description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(categoriesSelector);
  const subcategories = useSelector(subcategoriesSelector);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isServiceAdded, setIsServiceAdded] = useState(false);
  
  // Get the seller ID from cookies
  const sellerId = Cookies.get("sellerId") || "";

  useEffect(() => {
    console.log("Seller ID:", sellerId);

    const fetchCategories = async () => {
      try {
        const response = await AuthAxios.get(
          "http://localhost:8000/v1/categories"
        );
        if (!response.data) {
          throw new Error("Error fetching categories");
        }
        console.log("Fetched categories:", response.data.docs);
        dispatch(getAllCategories(response.data.docs));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await AuthAxios.get(
          "http://localhost:8000/v1/subcategories"
        );
        if (!response.data) {
          throw new Error("Error fetching subcategories");
        }
        console.log("Fetched subcategories:", response.data.docs);
        dispatch(getAllSubcategories(response.data.docs));
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, [dispatch, sellerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du formulaire
    const formErrors = [];

    if (!serviceData.service_name) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le nom du service est requis",
        path: "service_name",
        location: "body",
      });
    } else if (serviceData.service_name.length < 3) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le nom du service doit comporter au moins 3 caractères",
        path: "service_name",
        location: "body",
      });
    }

    if (!serviceData.categoryId) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le nom de la catégorie est requis",
        path: "categoryId",
        location: "body",
      });
    } else if (
      !categories.some((category) => category.id === serviceData.categoryId)
    ) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Veuillez saisir une catégorie valide",
        path: "categoryId",
        location: "body",
      });
    }

    if (!serviceData.subcategoryId) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le nom de la sous-catégorie est requis",
        path: "subcategoryId",
        location: "body",
      });
    } else if (
      !subcategories.some(
        (subcategory) => subcategory.id === serviceData.subcategoryId
      )
    ) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Veuillez saisir une sous-catégorie valide",
        path: "subcategoryId",
        location: "body",
      });
    }

    if (!sellerId) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le nom du vendeur est requis",
        path: "sellerId",
        location: "body",
      });
    } // Vous pouvez ajouter plus de validations pour le vendeur si nécessaire

    if (!serviceData.price) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le prix est requis",
        path: "price",
        location: "body",
      });
    } else if (isNaN(serviceData.price)) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Le prix doit être un nombre",
        path: "price",
        location: "body",
      });
    }

    if (!serviceData.short_description) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "La description courte est requise",
        path: "short_description",
        location: "body",
      });
    } else if (serviceData.short_description.length < 3) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "La description courte doit comporter au moins 3 caractères",
        path: "short_description",
        location: "body",
      });
    }

    if (!serviceData.long_description) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "La description longue est requise",
        path: "long_description",
        location: "body",
      });
    } else if (serviceData.long_description.length < 3) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "La description longue doit comporter au moins 3 caractères",
        path: "long_description",
        location: "body",
      });
    }

    if (!serviceData.images) {
      formErrors.push({
        type: "field",
        value: "",
        msg: "Une image est requise",
        path: "images",
        location: "body",
      });
    }

    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    // Si aucune erreur de validation, continuer avec la soumission du formulaire

    try {
      console.log("Submitting form data:", serviceData);
      const response = await AuthAxios.post(
        "http://localhost:8000/v1/services/add",
        serviceData
      );
      console.log("Submitting form data response:", response);
      if (response.data) {
        dispatch(addService(response.data));
        console.log(response.data);
        console.log("Service ", serviceData);
        setIsServiceAdded(true); // Show the alert
        setTimeout(() => {
          navigate("/services/create"); // Navigate after a short delay
        }, 3000); // 3 seconds delay
      } else {
        console.log("Error creating service");
      }
    } catch (error) {
      console.error("Error creating service:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setServiceData((prevState) => ({
      ...prevState,
      sellerId: sellerId,
      [name]: files ? files[0] : value,
    }));
    console.log("Updated Service Data:", {
      ...serviceData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    setServiceData((prevState) => ({
      ...prevState,
      categoryId: categoryId,
    }));
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setSelectedSubcategoryId(subcategoryId);
    setServiceData((prevState) => ({
      ...prevState,
      subcategoryId: subcategoryId,
    }));
  };

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategoryId) return [];
    const filtered = subcategories.filter(
      (subcategory) =>
        subcategory.category_name ===
        categories.find((category) => category.id === selectedCategoryId)
          ?.category_name
    );
    console.log("Selected Category ID:", selectedCategoryId);
    console.log("Categories:", categories);
    console.log("Subcategories:", subcategories);
    console.log("Filtered Subcategories:", filtered);
    return filtered;
  }, [subcategories, selectedCategoryId, categories]);

  const validateForm = () => {
    return (
      serviceData.service_name &&
      serviceData.categoryId &&
      serviceData.subcategoryId &&
      serviceData.price &&
      serviceData.short_description &&
      serviceData.long_description &&
      serviceData.images
    );
  };

  return (
    <div>
      <Navbar />
      <div>
        {isServiceAdded && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your purchase has been confirmed!</span>
          </div>
        )}
      </div>
      <div className="container mx-auto p-20">
        <h1 className="text-4xl font-bold mb-10">Create Service</h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          <section className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Service Details</h2>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  name="service_name"
                  className="block mb-6 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={serviceData.service_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="mt-2 mb-6 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={serviceData.categoryId}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  className="mt-2 mb-6 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={serviceData.subcategoryId}
                  onChange={handleSubcategoryChange}
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.subcategory_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Short Description
              </label>
              <input
                type="text"
                name="short_description"
                className="block mb-6 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={serviceData.short_description}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Long Description
              </label>
              <textarea
                name="long_description"
                className="block mb-6 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={serviceData.long_description}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Pricing</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                className="block mb-6 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark
                dark dark focus dark:focus focus focus "
                value={serviceData.price}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Images</h2>
            <div className="flex flex-col items-center mb-4">
              <label className="block text-sm font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                name="images"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />
              <p className="mt-2 text-sm text-gray-500">
                Accepted file types: jpg, jpeg, png, max size 2MB
              </p>
            </div>
          </section>
          <button
            type="submit"
            disabled={!validateForm()}
            className="px-8 py-3 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Create Service
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateService;
