import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
// import { GlobalStyle } from "./styles/GlobalStyle";
import "./styles/global.css"
import "modern-css-reset/dist/reset.min.css"

/** @type {React.VFC} */
export const App = () => {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthContextProvider>
    </StyleSheetManager>
  );
};
