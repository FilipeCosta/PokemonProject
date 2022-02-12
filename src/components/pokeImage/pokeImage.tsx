import { useState } from "react";
import styled from "styled-components";

interface PokeImgProps {
  src: string;
}

const PokemonImg = styled.img`
  width: 120px;
  height: 120px;
  justify-self: center;
`;

const PokeImage = (props: PokeImgProps) => {
  const { src } = props;
  const [imageSrc, setImageSrc] = useState(src);

  const onError = () => {
    setImageSrc("imageNotLoaded.png");
  };

  return <PokemonImg onError={onError} src={imageSrc}></PokemonImg>;
};

export default PokeImage;
