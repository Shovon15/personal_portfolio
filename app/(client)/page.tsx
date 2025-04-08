import AboutMe from "./_components/aboutMe/AboutMe";
import HeroComponent from "./_components/heroSection/hero";
import ProjectComponent from "./_components/projects/projects";

const ClientPage = () => {
  return (
    <div>
      <HeroComponent />
      <AboutMe />
      <ProjectComponent />
    </div>
  );
};

export default ClientPage;
