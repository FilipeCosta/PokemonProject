import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { COLOR } from "./utils/constants/constants";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }

  body {
    background-color: ${COLOR.MADANG};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <div id="modal" />
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div")
);
