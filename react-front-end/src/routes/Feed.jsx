import React, { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList";

const Feed = () => {
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
        <p>You are not following any organizations yet.</p>
        <p>To populate this feed, visit Organizations and follow the organizations you're most interested in!</p>
      </div>
    );
  }
  // otherwise, display the list of projects
  return (
    <ProjectList projects={projects}/>
  );
};

export default Feed;
