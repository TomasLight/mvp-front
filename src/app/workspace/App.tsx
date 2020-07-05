import { History } from "history";
import React, { FC } from "react";

interface IAppProps {
    history: History;
}

type Props = IAppProps;

const App: FC<Props> = (props) => {
    const { history } = props;

    return (
        <div>
            workspace app
        </div>
    );
};

export { App };
