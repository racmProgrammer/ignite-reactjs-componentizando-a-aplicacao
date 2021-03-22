// libs
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

// Components
import { Button } from '../Button';

// Styles
import './styles.scss';

// Interfaces/Types
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps{
  selectedGenreId: number;
  onHandleClickButton: (id:number) => void; 
}

// Component
export function SideBar({selectedGenreId, onHandleClickButton}: SideBarProps) {

  // Verifica o estado e armazena todos os gêneros retornados pelo JSON SERVER
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  // Consulta o JSON Server e pega as informações de todos os gêneros retornados
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onHandleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}