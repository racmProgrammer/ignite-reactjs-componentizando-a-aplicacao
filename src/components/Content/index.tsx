// Components
import { MovieCard } from '../MovieCard';

// Styles
import './styles.scss'

// Interfaces/Types
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

interface ContentProps{
  selectedGenreTitle: string;
  movies: MovieProps[];
}

// Component
export function Content({selectedGenreTitle, movies}: ContentProps) {
  
  return(
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenreTitle}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard 
              key ={movie.imdbID} 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>

  );
}