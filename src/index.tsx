import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo-hooks";
import theme from "theme";
import { ThemeProvider } from "styled-components";
import apolloClient from "apolloClient";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
