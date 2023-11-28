import ProjectListItem from "./ProjectListItem";
import { Nav } from "react-bootstrap";
import NavBar from "./NavBar";

const ProjectList = (props) => {
  const { projects } = props;

  return (
    <>
      <NavBar />
      <div className="project-list-container" style={{ margin: "20px" }}>
        <ul className="list-unstyled">
          {projects.map((project) => (
            <ProjectListItem key={project["id"]} project={project} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectList;
