import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetailsPage () {
  const [ projectDetails, setProjectDetails ] = useState(null)
  const params = useParams()

  useEffect(()=>{
    getData()
  },[])

  const getData=()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects/${params.projectId}?_embed=tasks`)
    .then((response)=>{
      setProjectDetails(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  if(projectDetails === null){//?Gestor de espera de respuesta de la llamada de la API
    return <h3>...buscando datos de proyecto.</h3>
  }

  return (
    <div className="ProjectDetailsPage">

      <div>
        <h1>{projectDetails.title}</h1>
        <p>{projectDetails.description}</p>
      </div>

      {projectDetails.tasks.map((eachTask)=>{
        return <TaskCard key={eachTask.id} eachTask={eachTask}/>
      })}

      <AddTask getData={getData}/>

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${params.projectId}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}

export default ProjectDetailsPage;
