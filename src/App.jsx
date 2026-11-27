// CIT12 Group
// Members: Aske. Jeffrey. Nicolai, Wanesa

import { useState, useEffect } from 'react';

function KnownFor({movie}) {
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

function ImagesFor({id}) {
  const [profiles, setProfiles] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setProfiles(data.profiles));
  }, [id, apiKey]);

  return (
    <div>
      {profiles.map((profile) => (
        <img
          key={profile.file_path}
          src={`https://image.tmdb.org/t/p/w185${profile.file_path}`}
          alt="Person profile"
        />
      ))}
    </div>
  );
}

function Person({person}) {
  return (
    <div>
      <p>{person.name}, {person.known_for_department}</p>
      {person.known_for.map((movie) => (
        <KnownFor key={movie.id} movie={movie} />
      ))}
      <ImagesFor id={person.id}/>
    </div>
  )
} 



function App() {
  const [persons, setPersons] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const query = 'spielberg';
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => { 
    fetch(`https://api.themoviedb.org/3/search/person?query=${query}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => setPersons(data.results))
  }, [apiKey]);

  return (
    <div>
      {persons.length > 0 && <Person person={persons[pageIndex]} />}
      <button onClick={() => setPageIndex(pageIndex-1)} style={{marginRight:'10px'}} disabled={pageIndex === 0}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex+1)} disabled={pageIndex >= persons.length - 1}>Next</button>   
    </div>
  )
}

export default App
