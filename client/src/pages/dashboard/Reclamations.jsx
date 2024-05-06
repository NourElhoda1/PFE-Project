import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  reclamationsSelector,
  getAllReclamations,
  isLoadingSelector,
} from "../../app/reclamationSlice";
import AuthAxios from "../../helpers/request";
import ReclamationTable from "../../components/dashboard/ReclamationTable";

function ReclamationS() {
  const dispatch = useDispatch();
  const reclamations = useSelector(reclamationsSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/reclamations?page=" + currentPage);
        if (!response.data) {
          console.log("Error fetching reclamations");
        }
        
        dispatch(getAllReclamations(response.data.docs));
        console.log(isLoading);
        console.log(reclamations);
      } catch (err) {
        console.log("Error fetching reclamations:", err);
      }
    };
    fetchData();
  }, [currentPage, dispatch]);

  return (
    <div className="flex bg-gray-300">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-2xl text-gray-900 font-semibold px-5">All Reclamations</h1>
        <section className="container px-4 mx-auto">
          <div className="flex flex-col">
            {!isLoading ? (
              <div className="flex flex-col mt-6">
                <ReclamationTable
                  reclamations={reclamations}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            ) : (
              <h1>Loading....</h1>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ReclamationS;
