import { COLOR, ERROR } from "src/utils/constants/constants";
import styled from "styled-components";

interface IErrorStateProps {
  request: () => void;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ErrorStateImage = styled.img`
  transform: scale(0.9);
  margin-left: 45px;
`;

const ErrorStateText = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const ErrorStateButton = styled.button`
  background-color: white;
  color: black;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  outline: 0;
  border: 1px solid ${COLOR.OSLO_GRAY};
  margin-top: 14px;
  cursor: pointer;
`;

const PokeErrorState = (props: IErrorStateProps) => {
  const { request } = props;

  return (
    <ErrorContainer>
      <ErrorStateImage src="pokemonError.png"></ErrorStateImage>
      <ErrorStateText>{ERROR.MESSAGE}</ErrorStateText>
      <ErrorStateButton onClick={request}>{ERROR.TRY_AGAIN}</ErrorStateButton>
    </ErrorContainer>
  );
};

export default PokeErrorState;
