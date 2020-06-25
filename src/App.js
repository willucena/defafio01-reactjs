import React, {useState , useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories ] = useState([])
  useEffect(()=> {
    api.get('repositories').then(
      response => {
        setRepositories(response.data);
      });
  },[]);

  async function handleAddRepository() {
    try{
      const response = await api.post('repositories', {
        title: 'Desafio ReactJS'
      });

      const respository = response.data;
      setRepositories([...repositories, respository]);

      return respository;
    }catch(e){
      console.log(e)
    }

  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (e){
      console.log(e);
    }
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
          )}
      </ul>
  
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
