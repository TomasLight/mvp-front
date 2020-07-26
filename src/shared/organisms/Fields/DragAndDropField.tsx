import React, { useState } from "react";
import { CircularProgress, makeStyles, Typography, withStyles } from "@material-ui/core";

import {
    DragAndDrop as DragAndDropAtom,
    IDragAndDropProps,
    IDragAndDropCallProps,
    DragAndDropClassKey
} from "@shared/atoms";
import { FileImageIcon } from "@icons";
import { Guid, Translate } from "@utils";
import { FieldBase, FieldBaseProps } from "./FieldBase";

const DragAndDrop = withStyles<DragAndDropClassKey>((theme) => ({
    root: {
        boxSizing: "border-box",
        height: 48,
        padding: "12px 16px",
        width: "100%",
        position: "relative",

        display: "grid",
        gridGap: 10,
        gridAutoFlow: "column",
        gridTemplateColumns: "24px auto",
        alignItems: "center",

        backgroundColor: "#F3F3F5",
        color: "#757575",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#F3F3F5",
        borderRadius: theme.borderRadius,

        "&:hover": {
            backgroundColor: "#e0e0e0",
            borderColor: "#e0e0e0",
            cursor: "pointer",
        },

        "& > p": {
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "19px",
            fontVariant: "small-caps",
        },
    },
    idle: {},
    error: {
        backgroundColor: "#FBEFEE",
        borderColor: "#ECACA5",
    },
    dragging: {
        backgroundColor: "#F0FAF3",
        borderColor: "#9EE2B8",
    },
}))(DragAndDropAtom);

const useStyles = makeStyles({
    progress: {
        color: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: "50%",
        marginTop: -12,
        right: 16,
    },
}, { name: "DragAndDropField" });

interface IDragAndDropFieldProps extends FieldBaseProps<DragAndDropClassKey>,
    IDragAndDropProps {

    innerText?: string;
    isLoading?: boolean;
}

type Props = IDragAndDropFieldProps & IDragAndDropCallProps;

const DragAndDropField = (props: Props) => {
    const {
        id = Guid.generate(),
        name,
        innerText = Translate.getString("перетащите или кликните"),
        isLoading = false,
        fileTypes,
        onDrop,
        ...rest
    } = props;
    const classes = useStyles();
    const [ fileName, setFileName ] = useState<string>("");

    const handleOnDrop = (files: FileList) => {
        setFileName(files.item(0).name);
        onDrop(files);
    };

    return (
        <FieldBase
            htmlFor={id}
            {...rest}
        >
            <DragAndDrop
                id={id}
                name={name}
                onDrop={handleOnDrop}
                error={rest.error}
                fileTypes={fileTypes}
            >
                <FileImageIcon/>
                <Typography noWrap>
                    {fileName || innerText}
                </Typography>
                {isLoading && (
                    <CircularProgress size={24} thickness={4} className={classes.progress}/>
                )}
            </DragAndDrop>
        </FieldBase>
    );
};

export { DragAndDropField, IDragAndDropFieldProps };
