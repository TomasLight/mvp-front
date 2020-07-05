import { createBrowserHistory, History } from "history";
import React from "react";
import ReactDOM from "react-dom";

import { AppRouter } from "./AppRouter";

const rootElement = document.getElementById("root");
const history: History = createBrowserHistory();

ReactDOM.render(
    <AppRouter history={history} />,
    rootElement
);
