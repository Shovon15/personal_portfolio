"use client";
import React, { useEffect, useState } from "react";
import CategoryButtonGroup from "./components/tabButtonGroup/CategoryButtonGroup";
import { useDataContext } from "@/context/dataProvider";
import TabDataGroup from "./components/tabDataGroup/TabDataGroup";

type Props = {};

const ProjectPage = (props: Props) => {
  const {
    activeTab,
    setActiveTab,
    categoryData,
    projectData,
    isProjectDataLoading,
  } = useDataContext();
  // console.log(categoryData, projectData, "project data");

  const handleTabClick = (tab: string) => setActiveTab(tab);

  return (
    <div className="p-0 md:p-10 w-full h-full relative">
      <CategoryButtonGroup
        buttonData={categoryData}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <TabDataGroup
        projectData={projectData}
        activeTab={activeTab}
        isLoading={isProjectDataLoading}
      />
    </div>
  );
};

export default ProjectPage;
