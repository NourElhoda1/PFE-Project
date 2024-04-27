import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdherents,
  isLoadingSelector,
  adherentsSelector,
} from "../../app/adherentSlice";
import AuthAxios from "../../helpers/request";
import AdherentsTable from "../../components/dashboard/AdherentsTable";

function Adherents() {

  const dispatch = useDispatch();
  const adherents = useSelector(adherentsSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get("http://localhost:8000/v1/adherents");
        if (!response.data) {
          console.log("Error fetching adherents");
        }
        dispatch(getAllAdherents(response.data.docs));
        console.log(isLoading);
      } catch (err) {
        console.log(err);
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
        <h1 className="text-2xl text-gray-900 font-semibold px-5">All Adherents</h1>
        <section className="container px-4 mx-auto">
          {/* <div className="flex items-center  mt-6 gap-x-3">
            <Link
              to="/"
              className="bg-dark text-white font-bold py-1 px-5 rounded m-3"
            >
              + Add
            </Link>
          </div> */}
          <div className="flex flex-col">
            {!isLoading ? (
              <div className="flex flex-col mt-6">
                <AdherentsTable
                  adherents={adherents}
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

export default Adherents;
