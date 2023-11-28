import ProjectListItem from "./ProjectListItem";

const ProjectList = (props) => {
  const { projects } = props;

  return (
    <div
      className="project-list-container shadow p-3 mb-5 bg-white rounded"
      style={{ padding: "0 20px", border: "1px solid black" }}
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
