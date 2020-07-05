import React, { FunctionComponent, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
}, { name: "SetupPage" });

interface ISetupPageCallProps {
}

type Props = ISetupPageCallProps;

const SetupPage: FunctionComponent<Props> = (props) => {

    return (
        <div>
            setup page
        </div>
    );
};

export { SetupPage, ISetupPageCallProps };
