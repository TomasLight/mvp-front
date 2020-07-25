import React from "react";
import { Button as MuiButton } from "@material-ui/core";

import { FormButton } from "./variants/FormButton";
import { SnackButton } from "./variants/SnackButton";
import { FilterButton } from "./variants/FilterButton";
import { GroupItemButton } from "./variants/GroupItemButton";
import { SizeButton } from "./variants/SizeButton";
import { ButtonProps } from "./ButtonProps";

type Props = ButtonProps;

const Button = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case "form":
            return <FormButton {...rest} />;

        case "snack":
            return <SnackButton {...rest} />;

        case "filter":
            return <FilterButton {...rest} />;

        case "size":
            return <SizeButton {...rest} />;

        case "group-item":
            return <GroupItemButton {...rest} />;

        default:
            return <MuiButton variant="contained" color="secondary" {...rest}/>;
    }
};

export { Button };
