import { createBrowserHistory, History } from "history";
import React from "react";
import ReactDOM from "react-dom";

import { AppRouter } from "./AppRouter";
import { configureMapper } from "./config/mapper";

const rootElement = document.getElementById("root");
const history: History = createBrowserHistory();

configureMapper();

ReactDOM.render(
    <AppRouter history={history} />,
    rootElement
);
