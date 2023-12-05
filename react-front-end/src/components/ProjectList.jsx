import ProjectListItem from "./ProjectListItem";

const ProjectList = (props) => {
  const { projects } = props;

  return (
    <>
      <div className="project-list-container" style={{ margin: "20px" }}>
        <ul>
          {projects.map((project) => (
            <ProjectListItem key={project["id"]} project={project} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectList;
