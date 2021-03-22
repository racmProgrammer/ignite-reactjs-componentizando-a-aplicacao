// Libs
import { useEffect, useState } from 'react';
import { api } from './services/api';

// Components
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';

// Styles
import './styles/global.scss';

// Interfaces/Types
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

// Component
export function App() {

  // Verifica o estado de seleção dos gêneros 
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  // Verifica o estado e armazena informações dos filmes de acordo com o gênero selecionado
  const [movies, setMovies] = useState<MovieProps[]>([]);

  // Verifica estado e armazena informações do gênero selecionado 
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  
  // Toda vez que um Gênero for selecionado o useEffect consulta as informações dos filmes daquele gênero e informações do gênero selecionado
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <SideBar selectedGenreId={selectedGenreId} onHandleClickButton={handleClickButton}/>
      <Content selectedGenreTitle={selectedGenre.title} movies={movies}/>
      
    </div>
  )
}