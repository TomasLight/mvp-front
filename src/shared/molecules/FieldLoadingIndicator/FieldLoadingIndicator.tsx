import React from "react";

import {
    createStyles,
    withStyles,
    StyledComponentProps,
} from "@material-ui/core";

import { Loader, LoaderProps } from "../Loaders";

type ClassKey =
    | "root"
    ;

const loaderSize = 24;
const styles = createStyles<ClassKey, IFieldLoadingIndicatorProps>({
    root: {
        position: "absolute",
        bottom: 0,
        display: "block",
        margin: 0,
        boxSizing: "border-box",
        zIndex: 1,
        top: `calc(50% - ${(loaderSize / 2)}px)`,
        right: (props) => props.right,
    },
});

interface IFieldLoadingIndicatorProps extends LoaderProps {
    right?: number | string;
}

type Props = IFieldLoadingIndicatorProps & StyledComponentProps<ClassKey>;

const FieldLoadingIndicator = (props: Props) => {
    const {
        classes,
        isLoading,
        right = 12,
        ...rest
    } = props;

    return (
        <Loader
            isLoading={isLoading}
            size={loaderSize}
            className={classes.root}
            {...rest}
        />
    );
};

const componentWithStyles = withStyles<ClassKey>(
    styles,
    { name: "FieldLoadingIndicator" }
)(FieldLoadingIndicator);
export {
    componentWithStyles as FieldLoadingIndicator,
    IFieldLoadingIndicatorProps,
    ClassKey as FieldLoadingIndicatorClassKey,
};
