import HeroComponent from "./_components/heroSection/hero";
import ProjectComponent from "./_components/projects/projects";

const ClientPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen">
      <HeroComponent />
      <ProjectComponent />
    </div>
  );
};

export default ClientPage;
