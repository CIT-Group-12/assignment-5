import { useState, useEffect } from 'react';

function Person({person}) {
  return (
    <div>
      <p>{person.name}, {person.known_for_department}</p>
    </div>
  )
} 

function App() {
  const [persons, setPersons] = useState([]);
  
  const query = 'spielberg';
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => { 
    fetch(`https://api.themoviedb.org/3/search/person?query=${query}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => setPersons(data.results))

  }, []);

  return (
    <div>
      {persons.map((p) => <Person person={ p } />)}
    </div>
  )
}

export default App