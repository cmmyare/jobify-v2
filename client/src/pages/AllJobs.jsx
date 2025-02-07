//import React from "react";
import { toast } from "react-toastify";
import { JobContainer, SearchContainer } from "../components";
import customFetch from "../utilits/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const Loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", { params });

    return { data, searcchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

const AllJobsContext = createContext();
const AllJobs = () => {
  const { data, searcchValues } = useLoaderData();
  //console.log(data);
  return (
    <AllJobsContext.Provider value={{ data, searcchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsCotext = () => useContext(AllJobsContext);
export default AllJobs;
