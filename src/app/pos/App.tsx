import { History } from "history";
import React from "react";

interface IAppProps {
    history: History;
}

type Props = IAppProps;

const App = (props: Props) => {
    const { history } = props;

    return (
        <div>
            workspace app
        </div>
    );
};

export { App };
