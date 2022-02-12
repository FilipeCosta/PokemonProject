import { ChangeEvent } from "react";
import {
  COLOR,
  GENERAL,
  REGION,
  REGION_IDENTIFIER,
} from "src/utils/constants/constants";
import { capitalize } from "src/utils/functions/functions";
import styled from "styled-components";

interface IPokeRegionsDropdown {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentSelectedRegion: string;
}

const PokeSelect = styled.select`
  width: 220px;
  padding: 5px 35px 5px 5px;
  font-size: 16px;
  border: 1px solid ${COLOR.OSLO_GRAY};
  height: 34px;
  cursor: pointer;
`;

const PokeSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  padding: 20px 0 6px;
`;

const RegionText = styled.div`
  font-size: 16px;
  margin-right: 8px;
  color: ${COLOR.MAKO};
  padding-bottom: 4px;
`;

const PokeRegionsDropdown = (props: IPokeRegionsDropdown) => {
  const { onChange, currentSelectedRegion } = props;

  return (
    <PokeSelectContainer>
      <RegionText>{capitalize(GENERAL.REGION)}</RegionText>
      <PokeSelect
        data-testid="dropdownTest"
        value={currentSelectedRegion}
        onChange={(e) => onChange(e)}
      >
        <option value={REGION.ALL}>{REGION_IDENTIFIER.ALL}</option>
        <option value={REGION.KANTO}>{REGION_IDENTIFIER.KANTO}</option>
        <option value={REGION.JOHTO}>{REGION_IDENTIFIER.JOHTO}</option>
        <option value={REGION.HOENN}>{REGION_IDENTIFIER.HOENN}</option>
        <option value={REGION.SINNOH}>{REGION_IDENTIFIER.SINNOH}</option>
        <option value={REGION.UNOVA}>{REGION_IDENTIFIER.UNOVA}</option>
        <option value={REGION.KALOS}>{REGION_IDENTIFIER.KALOS}</option>
        <option value={REGION.ALOLA}>{REGION_IDENTIFIER.ALOLA}</option>
        <option value={REGION.GALAR}>{REGION_IDENTIFIER.GALAR}</option>
      </PokeSelect>
    </PokeSelectContainer>
  );
};

export default PokeRegionsDropdown;
