import TabCardWrapper from "@/app/(client)/_components/projects/tabCardWrapper";
import { IProject } from "@/utils/dataTypes";
import React from "react";
type Props = {
  projectData: IProject[];
  activeTab: String;
  isLoading: Boolean;
};

const TabDataGroup = ({ projectData, activeTab, isLoading }: Props) => {
  console.log(isLoading, "isLoading");
  return (
    <div className="h-full">
      <div className="flex flex-wrap justify-center gap-5 p-5 mt-0 h-full">
        {isLoading ? (
          <div className="h-full min-h-[87dvh] flex justify-center items-center w-full">
            <p className="font-normal">loading...</p>
          </div>
        ) : projectData && projectData.length > 0 ? (
          projectData.map((item, index) => (
            <TabCardWrapper key={index} item={item} />
          ))
        ) : (
          <div className="h-full min-h-[87dvh] flex justify-center items-center w-full">
            <p className="font-normal">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabDataGroup;
