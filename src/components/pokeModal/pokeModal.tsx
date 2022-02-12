import { useEffect, useState } from "react";
import {
  IPokemon,
  IPokemonIndexType,
  IPokemonMoreInfo,
} from "../../utils/interfaces/interfaces";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PokeLoading from "../pokeLoading/pokeLoading";
import http from "src/services/httpService";
import PokeErrorState from "../pokeErrorState/pokeErrorState";
import { COLOR, POKEMON_INFO } from "src/utils/constants/constants";

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: relative;
  transform: translateY(-50%);
  top: 50%;
  background-color: ${COLOR.WHITE};
  margin: auto;
  border: 1px solid ${COLOR.WHITE};
  border-radius: 4px;
  width: 60vw;
  height: 72vh;

  @media (max-width: 768px) {
    width: 80vw;
    height: 90vh;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.SILVER_SAND};
`;

const ModalHeaderNumber = styled.div`
  font-size: 20px;
`;

const ModalHeaderTitle = styled.div`
  position: relative;
  top: 1.2px;
  font-size: 18px;
  margin-left: 8px;
`;

const ModalCloseImg = styled.img`
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const ModalHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ModalBody = styled.div`
  position: relative;
  padding: 0 20px 20px;
  max-height: 382px;
  overflow-y: auto;

  @media (max-width: 868px) {
    max-height: 500px;
  }

  @media (max-width: 400px) {
    max-height: 426px;
  }
`;

const ModalImg = styled.img`
  width: 120px;
  height: 120px;
  position: relative;
  left: 0;
  top: 0;

  @media (max-width: 868px) {
    top: 4px;
    left: 0px;
  }
`;

const CenteredContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalBodyContainer = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding-top: 16px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const ModalImageContainer = styled.div`
  @media (max-width: 600px) {
    align-self: center;
  }
`;
const ModalInfoContainer = styled.div`
  margin-top: 14px;
  @media (min-width: 868px) {
    display: flex;
    flex-direction: column;
  }
`;

const TableInfo = styled.table`
  width: 0 auto;
  border-spacing: 10px;
  position: relative;
  top: -10px;
`;

const TableRow = styled.tr`
  margin-bottom: 16px;
`;

const TableData = styled.td`
  text-align: left;
  width: auto;
  color: black;
  font-size: 14px;
  margin-left: 12px;
`;

const TableHeader = styled.th`
  text-align: right;
  width: auto;
  color: black;
  font-size: 14px;
  font-weight: 600;
  margin-left: 16px;
  margin-bottom: 14px;
  vertical-align: baseline;
`;

interface ImodalPropsType {
  pokemon: IPokemon;
  onClose: () => void;
}

const PokeModal = (props: ImodalPropsType) => {
  const { pokemon, onClose } = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemonMoreInfo, setPokemonMoreInfo] = useState(null);

  const onCloseModal = (e: MouseEvent) => {
    if ((e.target as Element).id === "modalContainer") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => onCloseModal(e));

    return () =>
      document.removeEventListener("click", (e: MouseEvent) => onCloseModal(e));
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const mapByProp = (
    pokemonMoreInfo: IPokemonMoreInfo,
    prop: string,
    nestedProp: string
  ) => {
    return pokemonMoreInfo[prop as keyof IPokemonIndexType].map((p: any) => {
      return p[nestedProp].name;
    });
  };

  const processRenderInfoArray = (pokemonMoreInfo: IPokemonMoreInfo) => {
    const { name, number } = pokemon;
    const abilities = mapByProp(
      pokemonMoreInfo,
      POKEMON_INFO.ABILITES,
      POKEMON_INFO.ABILITY
    );
    const types = mapByProp(
      pokemonMoreInfo,
      POKEMON_INFO.TYPES,
      POKEMON_INFO.TYPE
    );
    const moves = mapByProp(
      pokemonMoreInfo,
      POKEMON_INFO.MOVES,
      POKEMON_INFO.MOVE
    ).slice(0, 40);

    const finalPokemonInfo: IPokemonMoreInfo = {
      name,
      number,
      abilities,
      types,
      moves,
    };

    return finalPokemonInfo;
  };

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(false);
      const pokemonMoreInfo = await http.get(
        `/pokemon/${pokemon.name.toLowerCase()}`
      );

      const processedPokemonInfo = processRenderInfoArray(pokemonMoreInfo.data);
      setPokemonMoreInfo(processedPokemonInfo);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadingRender = () => {
    return (
      <CenteredContainer>
        <PokeLoading />
      </CenteredContainer>
    );
  };

  const errorRender = () => {
    return (
      <CenteredContainer>
        <PokeErrorState request={fetchPokemon}></PokeErrorState>
      </CenteredContainer>
    );
  };

  const modalContent = () => {
    return (
      <ModalBodyContainer>
        <ModalImageContainer>
          <ModalImg src={pokemon.img}></ModalImg>
        </ModalImageContainer>
        <ModalInfoContainer>
          <TableInfo>
            <tbody>
              {Object.keys(pokemonMoreInfo).map((p, index) => {
                return (
                  <TableRow key={index}>
                    <TableHeader>{p}: </TableHeader>
                    <TableData>
                      {Array.isArray(pokemonMoreInfo[p])
                        ? pokemonMoreInfo[p].join(", ")
                        : pokemonMoreInfo[p]}
                    </TableData>
                  </TableRow>
                );
              })}
            </tbody>
          </TableInfo>
        </ModalInfoContainer>
      </ModalBodyContainer>
    );
  };

  const modalElement = (
    <Modal id="modalContainer" data-testid="pokemonModalTestId">
      <ModalContainer>
        {loading && loadingRender()}
        {!loading && error && errorRender()}
        <ModalHeader>
          <ModalHeaderLeft>
            <ModalHeaderNumber>#{pokemon.number}</ModalHeaderNumber>{" "}
            <ModalHeaderTitle>{pokemon.name}</ModalHeaderTitle>
          </ModalHeaderLeft>
          <div>
            <ModalCloseImg onClick={onClose} src="close.png" />
          </div>
        </ModalHeader>
        <ModalBody>{!loading && !error && modalContent()}</ModalBody>
      </ModalContainer>
    </Modal>
  );

  return createPortal(modalElement, document.getElementById("modal"));
};

export default PokeModal;
