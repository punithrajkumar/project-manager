import React, { useState } from "react";
import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((preState) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectID: preState.selectedProjectId,
        id: taskID,
      };

      return {
        ...preState,
        tasks: [newTask, ...preState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((preState) => {
      return {
        ...preState,
        tasks: preState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((preState) => {
      return {
        ...preState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((preState) => {
      return {
        ...preState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((preState) => {
      return {
        ...preState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((preState) => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID,
      };

      return {
        ...preState,
        selectedProjectId: undefined,
        projects: [...preState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((preState) => {
      return {
        ...preState,
        selectedProjectId: undefined,
        projects: preState.projects.filter(
          (project) => project.id !== preState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="flex gap-8 h-screen">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
