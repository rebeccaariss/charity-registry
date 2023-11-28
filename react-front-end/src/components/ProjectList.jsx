import ProjectListItem from "./ProjectListItem";

const ProjectList = (props) => {
  const { projects } = props;

  return (
    <div
      className="project-list-container"
      style={{ margin: "20px" }}
    >
      <ul className="list-unstyled">
        {projects.map((project) => (
          // <li key={project["id"]}>
          //   <h2>{project["project_title"]}</h2>
          //   <p>{project["description"]}</p>
          // </li>
          <ProjectListItem key={project["id"]} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
