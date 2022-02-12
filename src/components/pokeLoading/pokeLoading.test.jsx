import { render } from "@testing-library/react";
import PokeLoading from "../pokeLoading/pokeLoading";

describe("PokeTable test", () => {
  it("should disable submit button on submit click", () => {
    const { queryByTestId } = render(<PokeLoading></PokeLoading>);

    expect(queryByTestId("loadingIndicator")).toBeInTheDocument();
  });
});
