import './card.css'

export interface IMovie {
  id: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: "2021-12-15";
  title: string;
}

const Card = (props: IMovie) => {
  console.log(props.id);
  
  return (
    <li className='card'>
       <img src={`https://image.tmdb.org/t/p/original${props.poster_path}`} alt="poster-film" /> 
    </li>
  );
};

export default Card;