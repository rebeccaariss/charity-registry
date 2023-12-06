import React, { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList";
import { useParams } from 'react-router-dom';

const Feed = () => {
  const { id } = useParams();
  // set up state for the list of projects
  const [projects, setProjects] = useState([]);

  // fetch the list of projects from the server
  useEffect(() => {
    fetch(`/api/projects/followed-projects/${id}`)
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

  return (
    <div className="feed" style={{margin: "0px 210px"}}>
      <ProjectList projects={projects}/>
    </div>
  );
};

export default Feed;
