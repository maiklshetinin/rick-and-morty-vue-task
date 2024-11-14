export interface ICharacterData extends ILocation {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
  url: string;
  origin: object;
  created: string;
  location: ILocation;
}

export interface ILocationData extends ILocation {
  residents: string[];
  url: string;
  created: string;
}

export interface ILocation {
  id: number;
  type: string;
  name: string;
  dimension: string;
}
