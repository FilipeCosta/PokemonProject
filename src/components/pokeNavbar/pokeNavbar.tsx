import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLOR, GENERAL } from "src/utils/constants/constants";

const Navbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: ${COLOR.CINABBAR};
`;

const PokemonImg = styled.img`
  margin-left: 30px;
  width: 95.4px;
  height: 35px;
`;

const PokeBallImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 35px;
`;

const PokemonSectionList = styled.div`
  display: flex;
`;

const PokemonSectionItem = styled(Link)`
  position: relative;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: -4px;
    background-color: ${COLOR.PORCELAIN};
  }

  &:hover {
    color: ${COLOR.PORCELAIN};
  }
`;

const PokeNavbar = () => {
  return (
    <Navbar>
      <Link to="/">
        <PokemonImg src="pokemonImg.png" />
      </Link>
      <PokemonSectionList>
        <PokemonSectionItem to="/pokedex">{GENERAL.POKEDEX}</PokemonSectionItem>
      </PokemonSectionList>
      <PokeBallImg src="pokeball.png"></PokeBallImg>
    </Navbar>
  );
};

export default PokeNavbar;
