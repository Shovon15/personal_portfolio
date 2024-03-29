// "use client";

// import { get } from "@/utils/fetchApi";
// import { ReactNode, createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useQuery } from "@tanstack/react-query";

// interface DataProviderProps {
//     children: ReactNode;
// }

// export interface Project {
//     _id: string;
//     name: string;
//     link: string;
//     images: string[];
//     category: string[];
//     description: string;
//     isEnabled: boolean;
// }

// interface DataContextType {
//     projectData: Project[];
//     isProjectDataLoading: boolean;
//     refetchProjectData: () => Promise<void>;
//     // fetchData: () => Promise<void>;
//     // logout: () => Promise<void>;
// }

// const initialAuthContext: DataContextType = {
//     projectData: [],
//     isProjectDataLoading: true,
//     refetchProjectData: async () => { },
//     // logout: async () => { },
// };

// export const DataContext = createContext<DataContextType>(initialAuthContext);

// export const DataProvider = ({ children }: DataProviderProps) => {
//     // const {
//     //     data: projectData = [] as Project[],
//     //     refetch: refetchProjectData,
//     //     isLoading: isProjectDataLoading,
//     // } = useQuery({
//     //     queryKey: ["projectData"],
//     //     queryFn: async () => {
//     //         const res = await get(`/project/all`);
//     //         const data = res.data.payload?.data;

//     //         return data as Project[];
//     //     },
//     // });

//     const dataInfo = {
//         // projectData,
//         // isProjectDataLoading,
//         // refetchProjectData,
//     };
//     return <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>;
// };

// export function useDataContext() {
//     return useContext(DataContext);
// }
