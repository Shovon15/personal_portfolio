import TabCardWrapper from "@/app/(client)/_components/projects/tabCardWrapper";
import React from "react";

const TabDataGroup = ({ projectData, activeTab }) => {
  return (
    <div className=" h-full">
      <div
        value={activeTab}
        className="flex flex-wrap justify-center gap-5 p-5 mt-0 h-full"
      >
        {!projectData ? (
          <div>loading</div>
        ) : projectData.length > 0 ? (
          projectData.map((item, index) => (
            <TabCardWrapper key={index} item={item} />
          ))
        ) : (
          <div className="h-full min-h-[87dvh]  flex justify-center items-center">
            <p className="font-normal">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabDataGroup;
