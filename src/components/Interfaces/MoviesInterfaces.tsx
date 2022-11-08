export interface IMovie {
  id: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface IList {
  description: string;
  id: number;
  name: string;
  poster_path: string;
  items: IMovie[];
}
