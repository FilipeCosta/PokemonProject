import { capitalize } from "./functions";

test("renders learn react link", () => {
  const str = "hello";
  const finalStr = "Hello";

  const capitalizedStr = capitalize(str);
  expect(capitalizedStr).toBe(finalStr);
});
