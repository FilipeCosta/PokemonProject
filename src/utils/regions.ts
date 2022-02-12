import { IRegions } from "./interfaces/interfaces";

const regions: IRegions = {
  all: {
    offset: 0,
    limit: 809,
  },
  kanto: {
    limit: 151,
    offset: 0,
  },
  johto: {
    limit: 100,
    offset: 151,
  },
  hoenn: {
    limit: 135,
    offset: 251,
  },
  sinnoh: {
    limit: 107,
    offset: 386,
  },
  unova: {
    limit: 156,
    offset: 493,
  },
  kalos: {
    limit: 72,
    offset: 649,
  },
  alola: {
    limit: 88,
    offset: 721,
  },
  galar: {
    limit: 96,
    offset: 809,
  },
};

export default regions;
