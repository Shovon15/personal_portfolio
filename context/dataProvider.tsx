"use client";

import { get } from "@/utils/fetchApi";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { ICategoryFromDB } from "@/utils/dataTypes";

interface DataProviderProps {
  children: ReactNode;
}

export interface Project {
  _id: string;
  name: string;
  link: string;
  images: string[];
  category: string[];
  description: string;
  isEnabled: boolean;
}

interface DataContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  projectData: Project[];
  isProjectDataLoading: boolean;
  // fetchData: () => Promise<void>;
  // logout: () => Promise<void>;
}

const initialAuthContext: DataContextType = {
  activeTab: "",
  setActiveTab: () => {},
  projectData: [],
  isProjectDataLoading: true,
  // logout: async () => { },
};

export const DataContext = createContext<DataContextType>(initialAuthContext);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  console.log(activeTab, "activeTab");
  const {
    data: categoryData = [] as ICategoryFromDB[],
    isLoading: categoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ["categoryPublicData"],
    queryFn: async () => {
      const res = await get("/category/public");
      const data = res.data.payload?.data;

      return data as ICategoryFromDB[];
    },
  });

  const {
    data: projectData = [] as Project[],
    isLoading: isProjectDataLoading,
  } = useQuery({
    queryKey: ["projectData", activeTab], // include activeTab
    queryFn: async () => {
      const res = await get(`/project/public/${activeTab}`);
      const data = res.data.payload?.data;

      return data as Project[];
    },
    enabled: !!activeTab, // optional: only run if activeTab is truthy
  });

  const dataInfo = {
    activeTab,
    setActiveTab,
    projectData,
    isProjectDataLoading,

    categoryData,
    categoryLoading,
    isCategoryError,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export function useDataContext() {
  return useContext(DataContext);
}
