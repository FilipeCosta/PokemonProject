import { ChangeEvent, useEffect, useState } from "react";
import http from "src/services/httpService";
import { IPokemon, IPokemons } from "src/utils/interfaces/interfaces";
import styled from "styled-components";
import PokeErrorState from "../pokeErrorState/pokeErrorState";
import PokeImage from "../pokeImage/pokeImage";
import PokeLoading from "../pokeLoading/pokeLoading";
import PokeModal from "../pokeModal/pokeModal";
import PokeRegionsDropdown from "../pokeRegionsDropdown/pokeRegionsDropdown";
import regions from "src/utils/regions";

import { useSearchParams } from "react-router-dom";
import { capitalize } from "src/utils/functions/functions";
import { GENERAL, REGION } from "src/utils/constants/constants";

const PokeTableContainer = styled.div``;

const CenteredContainer = styled.div`
  position: absolute;
  top: calc(50% + 50px);
  left: 50%;
  transform: translate(-50%, calc(-50% - 50px));
`;

const PokemonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const Pokemon = styled.div`
  max-width: 1200px;
  margin: 18px auto;
  display: grid;
  width: 140px;
  height: 140px;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  background-color: rgba(102, 204, 153, 0.6);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(102, 204, 153, 1);
  }
`;

const PokemonName = styled.h4`
  text-align: center;
  position: relative;
  top: -6px;
  font-weight: 700;
`;

const PokeTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [pokemons, setPokemons] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [region, setRegion] = useState(REGION.ALL);

  const toggle = (pokedexNumber: number) => {
    if (!showModal) {
      setPokemon(
        pokemons.results.find((p: IPokemon) => p.number === pokedexNumber)
      );
    }
    setShowModal(true);
  };

  useEffect(() => {
    getCurrentRegionPokemons();
  }, [searchParams]);

  const getCurrentRegionPokemons = () => {
    const _searchParams: string = searchParams.get(GENERAL.REGION);
    const currentRegionVal = _searchParams ? _searchParams : REGION.ALL;
    const region = regions[currentRegionVal];
    const { limit, offset } = region;
    setRegion(currentRegionVal);
    fetchPokemons(limit, offset);
  };

  const getPokemonImageUrl = (pokedexNumber: string): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`;

  const fetchPokemons = async (limit: number, offset: number) => {
    try {
      setLoading(true);
      setError(false);
      const resp = await http.get(`/pokemon?limit=${limit}&offset=${offset}`);
      const pokemons: IPokemons = resp.data;
      const mappedPokemons = getPokemonsWithImage(pokemons);
      setPokemons({ ...pokemons, results: mappedPokemons });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setShowModal(false);
  };

  const getPokemonIdentifier = (url: string) => {
    const urlWithoutLastSlash = url.slice(0, -1);
    const splittedArr = urlWithoutLastSlash.split("/");
    return splittedArr[splittedArr.length - 1];
  };

  const getPokemonsWithImage = (pokemons: IPokemons) => {
    const pokemonsWithImage = pokemons.results.map((p: IPokemon) => {
      const pokemonIdentifier: string = getPokemonIdentifier(p.url);
      const img = getPokemonImageUrl(pokemonIdentifier);

      return { ...p, number: pokemonIdentifier, img, name: capitalize(p.name) };
    });

    return pokemonsWithImage;
  };

  const renderLoading = () => {
    return (
      <CenteredContainer>
        <PokeLoading />
      </CenteredContainer>
    );
  };

  const renderErrorState = () => {
    return (
      <CenteredContainer>
        <PokeErrorState request={getCurrentRegionPokemons}></PokeErrorState>
      </CenteredContainer>
    );
  };

  const showGrid = () => {
    return error ? (
      renderErrorState()
    ) : (
      <PokemonsGrid data-testid="pokemonGridTestId">
        {pokemons.results.map((pokemon: IPokemon) => {
          return (
            <Pokemon
              title={pokemon.name}
              className="pokemonIdentifier"
              key={pokemon.number}
              onClick={() => toggle(pokemon.number)}
            >
              <PokeImage src={pokemon.img}></PokeImage>
              <PokemonName>{pokemon.name}</PokemonName>
            </Pokemon>
          );
        })}
      </PokemonsGrid>
    );
  };

  const onDropdownchange = (e: ChangeEvent<HTMLSelectElement>) => {
    const allRegions = REGION.ALL;
    const selectedValue = e.target.value;
    const selectedRegionQuery: string =
      selectedValue === allRegions ? "" : `${GENERAL.REGION}=${selectedValue}`;

    setSearchParams(selectedRegionQuery);
  };

  return (
    <PokeTableContainer>
      {showModal ? <PokeModal onClose={onClose} pokemon={pokemon} /> : null}
      <PokeRegionsDropdown
        currentSelectedRegion={region}
        onChange={(e) => onDropdownchange(e)}
      ></PokeRegionsDropdown>
      {loading ? renderLoading() : showGrid()}
    </PokeTableContainer>
  );
};

export default PokeTable;
