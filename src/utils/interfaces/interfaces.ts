export interface IPokemon {
  name: string;
  url: string;
  number?: number;
  img?: string;
}

export interface IPokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}

export interface IPokemonIndexType {
  abilities: IPokemonAbilities[];
  types: IPokemonTypes[];
  moves: IPokemonMoves[];
}

export interface IPokemonMoreInfo extends IPokemonIndexType {
  name?: string;
  number?: number;
  abilities: IPokemonAbilities[];
  types: IPokemonTypes[];
  moves: IPokemonMoves[];
}

export interface IPokemonAbilities {
  ability: IPokemonAbility[];
}

export interface IPokemonAbility {
  name: string;
  url?: string;
}

export interface IPokemonTypes {
  types: IPokemonTypes[];
}

export interface IPokemonType {
  name: string;
  url?: string;
}

export interface IPokemonMoves {
  move: IPokemonMove[];
}

export interface IPokemonMove {
  name: string;
  url?: string;
}

export interface IRegions {
  [key: string]: IRegion;
}

export interface IRegion {
  offset: number;
  limit: number;
}
