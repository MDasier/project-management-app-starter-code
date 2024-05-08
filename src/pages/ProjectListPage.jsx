import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from 'axios'

function ProjectListPage() {
  const [ projectsArr, setProjectsArr ] = useState([])

  useEffect(()=>{
    //* CON LIBRERIA AXIOS
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects`)
    .then((response)=>{
      //console.log(response)
      setProjectsArr(response.data)
    })
    .catch((error)=>{
      console.log(error)
      //?Gestionar redirección a páginas de error
    })



/* //* CON METODO FETCH
    fetch("https://project-management-api-4641927fee65.herokuapp.com/projects")
    .then((respuesta)=>{
      return respuesta.json()
    })
    .then((respuesta)=>{
      setProjectsArr(respuesta)
    })
    .catch((error)=>{
      console.log(error)
    })
*/
  },[])
  
  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {projectsArr.map((eachProject)=>{
        return <ProjectCard key={eachProject.id} eachProject={eachProject}/>
      })}
       
    </div>
  );
}

export default ProjectListPage;