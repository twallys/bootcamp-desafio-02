import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepositories(response.data);
    })

  }, [])

  async function handleAddRepository() {

    const repository = { 
      title: `Salvo do Front ${Date.now()}`,
      url: 'http://github.com/twallys/bootcamp-desafio-02.git',
      techs: [
        'FrontEnd',
        'React JS'
      ]
    }
    
    const response = await api.post('repositories', repository)

    setRepositories([ ...repositories, response.data ])

  }

  async function handleRemoveRepository(id) {
    
    let repositoriesUpdated = repositories

    await api.delete('repositories/' + id);

    repositoriesUpdated = repositoriesUpdated.filter(repository => repository.id !== id);
    
    setRepositories(repositoriesUpdated);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
