import PokeTable from "./pokeTable";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  render,
  waitFor,
  fireEvent,
  findByTestId,
} from "@testing-library/react";

describe("PokeTable test", () => {
  it("Should show all pokemons in pokedex", async () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokeTable></PokeTable>} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(container.getElementsByClassName("pokemonIdentifier").length).toBe(
        809
      );
    });
  });

  it("Should change pokemons length when dropdown changed", async () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokeTable></PokeTable>} />
        </Routes>
      </BrowserRouter>
    );

    const dropdown = getByTestId("dropdownTest");
    fireEvent.change(dropdown, { target: { value: "kanto" } });
    await findByTestId(container, "loadingIndicator");
    await findByTestId(container, "pokemonGridTestId");
    expect(container.getElementsByClassName("pokemonIdentifier").length).toBe(
      151
    );
  });
});
