import React, { useEffect, useState } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
  // set up state for the list of projects
  const [projects, setProjects] = useState([]);

  // fetch the list of projects from the server
  useEffect(() => {
    fetch("/api/projects/followed-projects")
      .then((response) => {
        // check if the response is ok
        if (!response.ok) {
          throw new Error(`error! ${response.status}`);
        }
        return response.json();
      })
      // set the list of projects in state
      .then((data) => {
        setProjects(data);
      })
      // catch any errors and log them to the console
      .catch((error) => {
        console.error("Error:", error);
      });
    // empty dependency array to run only once
  }, []);

  // if there are no projects, display a message
  if (projects.length === 0) {
    return (
      <div>
        <p>You are not following any projects yet.</p>
      </div>
    );
  }
  // otherwise, display the list of projects
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
