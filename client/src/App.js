import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ProjectsTable from "./components/projects";

function App() {
  const [projects, setProjects] = useState([]);
  const [actions, setActions] = useState([]);
  const [error, setError] = useState(null);

  const getData = e => {
    axios
      .get("/api/projects", { id: "" })
      .then(projects => {
        setProjects(projects.data);
        console.log(projects);
      })
      .catch(error => {
        setError(error.message);
      });
    axios
      .get("/api/actions", { id: "" })
      .then(actions => {
        setActions(actions.data);
        console.log(actions);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleClick = e => {
    getData();
  };

  return (
    <div>
      <h2>Projects</h2>
      <button onClick={handleClick}>See Projects</button>
      <ProjectsTable projects={projects} actions={actions} />
    </div>
  );
}

export default App;
